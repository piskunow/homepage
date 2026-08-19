/**
 * Floquet replica band structure.
 *
 * A two-band lattice with a gap 2Δ is driven periodically at frequency Ω.
 * The drive dresses each band with photon replicas at E ± nΩ, and wherever a
 * replica of one branch crosses a replica of the other the drive hybridises
 * them and opens a gap instead of letting them cross.
 *
 * One-photon processes couple |Δn| = 1 and open the large gaps; two-photon
 * processes couple |Δn| = 2 and open much smaller ones. That size ordering is
 * the "hierarchy of Floquet gaps" — Phys. Rev. A 91, 043625.
 *
 * Everything here runs at build time. The page ships no JavaScript.
 */

export type Band = { d: string }
export type GapMarker = { x: number; y: number; size: number }
export type Figure = {
  bands: Band[]
  gaps: GapMarker[]
  width: number
  height: number
}

/** Cyclic Jacobi eigenvalue algorithm for a real symmetric matrix. */
function eigenvalues(matrix: number[][]): number[] {
  const n = matrix.length
  const a = matrix.map(row => [...row])

  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0
    for (let p = 0; p < n; p++)
      for (let q = p + 1; q < n; q++) off += a[p][q] * a[p][q]
    if (off < 1e-18) break

    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(a[p][q]) < 1e-15) continue
        const theta = (a[q][q] - a[p][p]) / (2 * a[p][q])
        const t =
          Math.sign(theta || 1) /
          (Math.abs(theta) + Math.sqrt(theta * theta + 1))
        const c = 1 / Math.sqrt(t * t + 1)
        const s = t * c
        for (let k = 0; k < n; k++) {
          const akp = a[k][p]
          const akq = a[k][q]
          a[k][p] = c * akp - s * akq
          a[k][q] = s * akp + c * akq
        }
        for (let k = 0; k < n; k++) {
          const apk = a[p][k]
          const aqk = a[q][k]
          a[p][k] = c * apk - s * aqk
          a[q][k] = s * apk + c * aqk
        }
      }
    }
  }

  return Array.from({ length: n }, (_, i) => a[i][i]).sort((x, y) => x - y)
}

export function floquetFigure({
  width = 1000,
  height = 300,
  samples = 320,
  delta = 0.28, // half the static band gap
  omega = 1.6, // drive frequency
  v1 = 0.13, // one-photon coupling
  v2 = 0.032, // two-photon coupling
  replicas = [-1, 0, 1],
  eMax = 1.95, // energy window drawn
  // Branches that only clip the corner of the window read as debris, not
  // as band structure. Drop any drawn arc narrower than this in k.
  minSegmentFraction = 0.12,
} = {}): Figure {
  // Basis: one entry per (branch, replica) pair.
  const basis: { branch: 1 | -1; n: number }[] = []
  for (const n of replicas) {
    basis.push({ branch: -1, n })
    basis.push({ branch: 1, n })
  }
  const dim = basis.length

  const kMin = -Math.PI
  const kMax = Math.PI
  const xOf = (k: number) => ((k - kMin) / (kMax - kMin)) * width
  const yOf = (e: number) => height / 2 - (e / eMax) * (height / 2)

  // Eigenvalue branches, sorted at every k so each polyline stays smooth and
  // never crosses its neighbour — which is exactly the avoided-crossing picture.
  const levels: number[][] = Array.from({ length: dim }, () => [])
  const ks: number[] = []

  for (let i = 0; i < samples; i++) {
    const k = kMin + ((kMax - kMin) * i) / (samples - 1)
    ks.push(k)

    const bare = basis.map(
      ({ branch, n }) =>
        branch * Math.sqrt(delta * delta + 4 * Math.sin(k / 2) ** 2) +
        n * omega,
    )

    const h: number[][] = Array.from({ length: dim }, () =>
      new Array(dim).fill(0),
    )
    for (let p = 0; p < dim; p++) {
      h[p][p] = bare[p]
      for (let q = p + 1; q < dim; q++) {
        // The drive connects opposite branches; the order of the process is
        // the photon-number difference.
        if (basis[p].branch === basis[q].branch) continue
        const dn = Math.abs(basis[p].n - basis[q].n)
        const coupling = dn === 1 ? v1 : dn === 2 ? v2 : 0
        h[p][q] = coupling
        h[q][p] = coupling
      }
    }

    const ev = eigenvalues(h)
    for (let b = 0; b < dim; b++) levels[b].push(ev[b])
  }

  // Emit one path per branch, breaking it wherever it leaves the energy window
  // so curves stop at the frame instead of being squashed into it. Segments
  // that barely dip into the window are dropped: they read as stray debris
  // rather than as band structure.
  const bands: Band[] = []
  for (const level of levels) {
    const segments: number[][] = []
    let current: number[] = []
    for (let i = 0; i < ks.length; i++) {
      if (Math.abs(level[i]) > eMax) {
        if (current.length) segments.push(current)
        current = []
        continue
      }
      current.push(i)
    }
    if (current.length) segments.push(current)

    const d = segments
      .filter(seg => seg.length / samples >= minSegmentFraction)
      .map(seg =>
        seg
          .map(
            (i, n) =>
              `${n === 0 ? "M" : "L"}${xOf(ks[i]).toFixed(2)} ${yOf(level[i]).toFixed(2)}`,
          )
          .join(""),
      )
      .join("")

    if (d) bands.push({ d })
  }

  // Find the avoided crossings rather than placing them by hand: a local
  // minimum in the separation between adjacent branches is a gap.
  const gaps: GapMarker[] = []
  for (let b = 0; b < levels.length - 1; b++) {
    for (let i = 2; i < ks.length - 2; i++) {
      const sep = levels[b + 1][i] - levels[b][i]
      const prev = levels[b + 1][i - 1] - levels[b][i - 1]
      const next = levels[b + 1][i + 1] - levels[b][i + 1]
      if (!(sep < prev && sep <= next)) continue
      if (sep > 4 * v1) continue // not a hybridisation, just two distant bands
      const mid = (levels[b + 1][i] + levels[b][i]) / 2
      if (Math.abs(mid) > eMax * 0.94) continue
      gaps.push({
        x: xOf(ks[i]),
        y: yOf(mid),
        // Marker scales with the gap, so the hierarchy is visible.
        size: Math.max(2.1, Math.min(6, (sep / (2 * v1)) * 4.6)),
      })
    }
  }

  return { bands, gaps, width, height }
}
