---
title: "Deep Questions: Growing a side project into a Startup"
date: 2021-07-01
update: 2023-08-06
tags:
  - LLM
  - Progressive Web Applications
  - gatsby
  - react
series: "Entrepreneurship"
---

## Side project turn Startup

Two years ago, we embarked with two friends on an exciting journey to turn a side project, Deep Questions, into a startup. Although the startup didn't achieve the success initially envisioned, the experience was filled with invaluable lessons, personal growth, and a wealth of self-taught technical skills.

> Checkout some of the [books](/books) that introduced me to the startup world. Specially, 'From zero to one' and 'The Lean Startup'.

## Yes! Delft - Validation Lab

The journey began at the Yes! Delft Validation Lab, a leading tech incubator in Europe. This 10-week program provided me with the right skills, an extensive toolset, and access to a thriving tech ecosystem to validate the business idea and find the Problem-Solution Fit.

### Product validation

We started by identifying customer personas, conducting interviews, and striving to achieve product-market fit. The target customers were learners and teachers who needed a time-saving learning tool. This process was guided by the principles outlined in "The Mom Test", which emphasizes the importance of understanding customer needs and validating business ideas through customer conversations.

### Business model

The business model was designed around a freemium, subscription-based model for learners and teachers. For institutions, a licensing model was offered with a negotiated price, depending on product features, user volume, customer support, and customization of the services.

![Business Model Canvas](/images/DQ_business_model.png)

## Language models in production

We used GPT-2 and BERT language models in production. We were granted AWS credit and early access to OpenAI GPT-2, which was the most advanced model at the time, and later on to GPT-3, the base of ChatGPT. This experience allowed me to delve deep into the world of language models and understand their practical applications in a real-world setting.

### Serverless progressive web applications

The application was divided into frontend and backend. I self-taught JavaScript, React, Gatsby, Firebase, and serverless PWAs to build and optimize the application.

#### Frontend

For the frontend, I used Firebase, Gatsby, and React. Firebase managed user authentication and the Firestore database, enabling the saving of prompts and generated output. I learned about concepts such as user authentication, private routes, and browser-generated pages. I also benchmarked the app with Lighthouse to ensure it was blazing fast and provided an excellent user experience.

#### UI/UX

I learned to adjust the user paths. For example, users can create an account and login.
If they try to access a protected route, like the application itself, they will be directed to login and back.
The landing page has a modal prompting to subscribe that doesn't show for authenticated users.

I learned to use the Material UI design system, and many of its components
* Theme: Centralized configuration of fonts, colors and sizes.

    I found a font to match the logo
    ![Deep Questions Font](/images/DQ_name_600.png)

    But also designed the logo
    ![Deep Questions Logo](/images/DQ_192.png)

* Snacks: Alerts that guide the user actions and provide feedback on errors and success.
* Modals: Subscribe or click-away to discard it.
* Responsive Design: Grids for adjusting the layout. Drawer auto-hides for small screens, like mobile in portrait position, and some elements of the AppBar move to the Drawer if there is no space.

![DQ WebApp medium screens](/images/DQ_Questions_md.png)
![DQ WebApp small screens](/images/DQ_Questions_sm.png)


#### Backend

For the backend, I used Google Cloud Functions to host a BERT model, fine-tuned to generate questions and summarize long texts. This involved integrating the backend and frontend via APIs, a process that deepened my understanding of serverless architecture and its benefits.


## The Application

Even though the backend services are no longer maintained, you can still check out the frontend of the Deep Questions application [here](https://deep-questions.web.app). Please note that some functionalities might not work due to the backend services being inactive.

![WebApp Screenshot](/images/DQ_LandingPage.png)

## Take-aways

This journey taught me a lot about starting a business. It's hard, it requires consistency, and most importantly, a good team. I learned that I should not build a product based on a solution I found, but rather on a problem that many people have. I should not convince users to buy product X; instead, a product should deliver value to customers. When this happens, both the entrepreneur and the customers know it immediately.

The Validation Lab program also emphasized the importance of customer validation, pitching, and market focus. I was encouraged to talk to as many potential customers as possible, develop a strong elevator pitch, and identify beachhead markets. The program also provided me with a dedicated mentor and access to a vast network of specialized mentors and experts.

Throughout this journey, I also delved into the world of decision intelligence. I learned about the cognitive biases that influence our decisions and the importance of building systems that can withstand and benefit from uncertainty. "Zero to One" taught me the importance of creating something new and unique, while "The Lean Startup" introduced me to the concept of iterative product development and validated learning.

Despite the outcome, I am grateful for the experience and the growth it has brought me. I am excited to apply these lessons to my future endeavors.

![Team Photo](/path/to/team-photo.png)
