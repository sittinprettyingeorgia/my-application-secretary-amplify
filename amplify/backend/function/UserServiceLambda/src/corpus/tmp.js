const tmpData = {
    "name": {
        "intent": "question.name",
        "utterances": [
            "What is your full name?",
            "first name",
            "last name"
        ],
        "answers": []
    },
    "streetaddress": {
        "intent": "question.streetAddress",
        "utterances": [
            "What is your address?",
            "What is your home address?",
            "What is your street address?"
        ],
        "answers": []
    },
    "phone": {
        "intent": "question.phone",
        "utterances": [
            "What is your phone number?"
        ],
        "answers": []
    },
    "date": {
        "intent": "question.date",
        "utterances": [
            "today's date",
        ],
        "answers": []
    },
    "security": {
        "intent": "question.security",
        "utterances": [
            "Are you familiar with security considerations in software development?",
            "Have you ever implemented security measures such as SSL or TLS?"
        ],
        "answers": []
    },
    "citizenship": {
        "intent": "question.citizenship",
        "utterances": [
            "What is your citizenship status?",
            "What is your work authorization status?"
        ],
        "answers": []
    },
    "jobTitle": {
        "intent": "question.jobTitle",
        "utterances": [
            "What is your current job title?"
        ],
        "answers": []
    },
    "education": {
        "intent": "question.education",
        "utterances": [
            "What is your highest level of education?"
        ],
        "answers": []
    },
    "language": {
        "intent":"question.language",
        "utterances": [
            "What languages do you speak?"
        ],
        "answers":[]
    },
    "selfManagement": {
        "intent":"question.selfManagement",
        "utterances": [
            "What is your approach to time management?",
            "What is your level of experience with time management?",
        ],
        "answers":[]
    },
    "management": {
        "intent":"question.management",
        "utterances": [
            "What is your management style?",
            "What is your level of experience with project management?",
            "Do you have experience with remote project management?",
        ],
        "answers":[]
    },
    "remote": {
        "intent":"question.remote",
        "utterances": [
            "Do you have experience with remote project management?",
            "Are you comfortable with remote project management targets and goals?",
        ],
        "answers":[]
    },
    "database": {
        "intent":"question.database",
        "utterances": [
            "What is your experience with database management?"
        ],
        "answers":[]
    },
    "generalProgramming": {
        "intent":"question.generalProgramming",
        "utterances": [
            "What is your level of experience with programming languages?",
            "What programming languages are you proficient in?"
        ],
        "answers":[]
    },
    "cms":{
        "intent":"question.cms",
        "utterances": [
            "What is your experience with content management systems such as WordPress or Drupal?",
            "What programming languages are you proficient in?"
        ],
        "answers":[]
    },
    "ecommerce": {
        "intent":"question.cms",
        "utterances": [
            "What is your experience with e-commerce platforms such as Magento or Shopify?"
        ],
        "answers":[]
    },
    "aws":{
        "intent":"question.aws",
        "utterances": [
            "What is your experience with message queues such as RabbitMQ or Kafka?",
            "Have you worked with message-driven architectures like RabbitMQ or Apache Kafka?",
            "Have you ever used RabbitMQ for message queuing?",
            "Have you worked with Google Cloud Pub/Sub for message queuing?",
            "Have you ever used Apache Kafka for message queuing?",
            "Have you worked with message queueing systems like RabbitMQ or Apache Kafka?"
        ],
        "answers":[]
    },
    "nlp":{
        "intent":"question.nlp",
        "utterances": [
            "Have you ever built a chatbot using natural language processing?",
            "Have you worked with natural language processing (NLP) technologies like Google Cloud Natural Language or Amazon Comprehend?",
        ],
        "answers":[]
    },
    "distributedSystems":{
        "intent":"question.distributedSystems",
        "utterances": [
            "Have you ever used Apache Cassandra for distributed data storage?"
        ],
        "answers":[]
    },
    "workflow":{
        "intent":"question.workflow",
        "utterances": [
            "Have you ever worked with Apache Airflow for workflow management?"
        ],
        "answers":[]
    },
    "bigData":{
        "intent":"question.bigData",
        "utterances": [
            "Have you ever used Apache NiFi for data flow management?"
        ],
        "answers":[]
    },
    "salesForce":{
        "intent":"question.salesForce",
        "utterances": [
            "Have you worked with customer relationship management (CRM) systems like Salesforce or Dynamics 365?"
        ],
        "answers":[]
    },
    "automation":{
        "intent":"question.automation",
        "utterances": [
            "Have you worked with configuration management tools like Ansible or Puppet?",
        ],
        "answers":[]
    },
    "logging":{
        "intent":"question.logging",
        "utterances": [
            "Have you worked with log management tools like Splunk or ELK Stack?",
        ],
        "answers":[]
    },
    "age": {
        "intent": "question.age",
        "utterances": [
            "Have you worked with natural language processing (NLP) technologies like Google Cloud Natural Language or Amazon Comprehend?",
            "Have you worked with a message broker such as RabbitMQ or Kafka?",
            "Have you ever worked with natural language processing (NLP) techniques?",
            "Have you ever worked with a content management system (CMS) such as WordPress or Drupal?",
            "Have you ever worked with an e-commerce platform such as Shopify or Magento?"
        ],
        "answers": []
    },
    "salary": {
        "intent": "question.salary",
        "utterances": [
            "What is your current salary?",
            "What are your salary expectations?",
            "What is your desired salary range?"
        ],
        "answers": []
    },
    "location": {
        "intent": "question.location",
        "utterances": [
            "What is your current location?"
        ],
        "answers": []
    },
    "country": {
        "intent": "question.country",
        "utterances": [
            "Are you legally eligible to work in the country of the job position?",
            "Are you legally eligible to work in the country of the job position?"
        ],
        "answers": []
    },
    "veteran": {
        "intent": "question.veteran",
        "utterances": [
            "What is your veteran status?"
        ],
        "answers": []
    },
    "disability": {
        "intent": "question.disability",
        "utterances": [
            "What is your disability status?"
        ],
        "answers": []
    },
    "backend": {
        "intent": "question.backend",
        "utterances": [
            "Do you require any accommodations to perform the job duties?",
            "Are you comfortable with feedback and criticism to improve your work performance?",
            "Are you comfortable with remote performance evaluations and assessments?",
            "What is your experience with server administration?",
            "What is your experience with server-side rendering?",
            "What is your experience with software performance tuning",
            "Do you have experience with Terraform?",
            "Do you have experience with Terraform?",
            "Have you used Terraform for infrastructure as code?",
            "Have you ever used Apache Storm for stream processing?",
            "Have you ever done performance testing for a large-scale system?"
        ],
        "answers": []
    },
    "office": {
        "intent": "question.office",
        "utterances": [
            "What is your proficiency level with Microsoft Office?",
            "What is your proficiency level with Microsoft Office?",
            "Do you have a home office or dedicated workspace?"
        ],
        "answers": []
    },
    "app": {
        "intent": "question.app",
        "utterances": [
            "Can you walk me through how you would approach a project that requires expertise in [specific skill or technology]?",
            "What is your approach to problem-solving?",
            "What is your approach to teamwork?",
            "What is your approach to problem-solving?",
            "What is your approach to teamwork?",
            "What is your experience with mobile app development?",
            "What is your experience with desktop app development?",
            "Have you ever developed a software application from scratch?",
            "Have you implemented authentication and authorization in your applications before?",
            "Have you used Firebase for building mobile applications?",
            "Have you ever implemented caching strategies for a high-traffic application?",
            "Have you ever built a mobile application?",
            "Have you ever built a social media application?",
            "Have you ever built a decentralized application (dApp)?"
        ],
        "answers": []
    },
    "devenvironment": {
        "intent": "question.devenvironment",
        "utterances": [
            "Can you provide examples of how you have incorporated [specific skill or technology] into your previous work?",
            "What is your level of experience with video editing?",
            "Are you comfortable using video conferencing software?",
            "Can you provide examples of successful projects you have completed?",
            "Can you provide references from previous employers or colleagues?",
            "Are you comfortable with video conferencing and remote presentations?",
            "Have you worked with accessibility standards and guidelines like WCAG 2.0?"
        ],
        "answers": []
    },
    "reasonforleaving": {
        "intent": "question.reasonforleaving",
        "utterances": [
            "What is your reason for leaving your current job?",
            "What is your reason for leaving your current job?"
        ],
        "answers": []
    },
    "leadership": {
        "intent": "question.leadership",
        "utterances": [
            "What leadership experience do you have?",
            "What is your level of experience with leadership?"
        ],
        "answers": []
    },
    "sales": {
        "intent": "question.sales",
        "utterances": [
            "What is your level of experience with sales?",
            "What is your level of experience with sales?",
            "Do you have experience with remote sales and business development?",
            "Are you comfortable with remote sales targets and goals?"
        ],
        "answers": []
    },
    "web": {
        "intent": "question.web",
        "utterances": [
            "What is your level of experience with web design?",
            "Do you have experience with web analytics and tracking software, such as Google Analytics?",
            "What is your experience with responsive web design?",
            "What is your experience with website accessibility?",
            "Are you familiar with web application security best practices?",
            "What is your experience with web services such as REST or SOAP?",
            "Have you worked with websockets before?",
            "Have you ever implemented a caching layer for a web application?",
            "Have you ever implemented a load balancer for a web application?",
            "Have you ever implemented a custom caching strategy for a web application?",
            "Are you familiar with web application security best practices?",
            "Have you worked with web analytics tools like Google Analytics?",
            "Have you ever done load balancing for a web application?",
            "Have you ever implemented A/B testing for a website or application?",
            "Have you ever implemented automated testing for a web application?",
            "Have you ever worked with a web scraping tool such as BeautifulSoup or Scrapy?",
            "Have you ever worked with a web server such as Apache or Nginx?",
            "Have you ever done vulnerability testing for a web application?"
        ],
        "answers": []
    },
    "communication": {
        "intent": "question.communication",
        "utterances": [
            "What is your level of experience with teamwork?",
            "Have you ever implemented real-time communication functionality?"
        ],
        "answers": []
    },
    "net": {
        "intent": "question.net",
        "utterances": [
            "Do you have a reliable internet connection?",
            "Have you ever implemented a content delivery network (CDN)?"
        ],
        "answers": []
    },
    "position": {
        "intent": "question.position",
        "utterances": [
            "Do you have any questions about the job position or the company?"
        ],
        "answers": []
    },
    "need": {
        "intent": "question.need",
        "utterances": [
            "Are you able to work flexible hours or overtime if needed?"
        ],
        "answers": []
    },
    "backgroundcheck": {
        "intent": "question.backgroundcheck",
        "utterances": [
            "Are you willing to undergo a background check or drug test, if required?"
        ],
        "answers": []
    },
    "role": {
        "intent": "question.role",
        "utterances": [
            "Do you have experience in a client-facing role?",
            "Are you comfortable with working in a remote content creation role?"
        ],
        "answers": []
    },
    "marketing": {
        "intent": "question.marketing",
        "utterances": [
            "Do you have experience with online marketing and advertising?",
            "Are you comfortable with online marketing targets and goals?"
        ],
        "answers": []
    },
    "analysis": {
        "intent": "question.analysis",
        "utterances": [
            "Are you comfortable with conducting online market research and analysis?",
            "Have you implemented sentiment analysis before?"
        ],
        "answers": []
    },
    "writing": {
        "intent": "question.writing",
        "utterances": [
            "Do you have experience with writing and editing online content?"
        ],
        "answers": []
    },
    "debugging": {
        "intent": "question.debugging",
        "utterances": [
            "Do you have experience with remote IT support and troubleshooting?",
            "What is your experience with debugging and troubleshooting?"
        ],
        "answers": []
    },
    "skills": {
        "intent": "question.skills",
        "utterances": [
            "What are your top three technical skills?"
        ],
        "answers": []
    },
    "fullstack": {
        "intent": "question.fullstack",
        "utterances": [
            "What is your experience with full-stack development?",
            "What is your experience with web development frameworks?"
        ],
        "answers": []
    },
    "api": {
        "intent": "question.api",
        "utterances": [
            "What is your experience with API development?",
            "Do you have experience with Flask RESTful?",
            "Do you have experience with Django REST Framework?",
            "Do you have experience with Flask RESTful?",
            "Do you have experience with Django REST Framework?",
            "Have you built a RESTful API before?",
            "Have you ever implemented rate limiting for an API?",
            "Have you worked with RESTful API design?",
            "Have you ever built an API from scratch?",
            "Have you worked with a GraphQL API before?",
            "Have you ever integrated a third-party API such as Stripe or Twilio?"
        ],
        "answers": []
    },
    "cloud": {
        "intent": "question.cloud",
        "utterances": [
            "What is your experience with cloud technologies?",
            "Are you familiar with cloud-native development practices?",
            "Do you have experience with Google Cloud Platform?",
            "Do you have experience with Google Cloud Platform (GCP)?",
            "Do you have experience with Google Cloud Platform?",
            "Do you have experience with Google Cloud Platform (GCP)?",
            "Have you worked with infrastructure as code tools like Terraform or CloudFormation?",
            "Have you worked with cloud-based infrastructure before?"
        ],
        "answers": []
    },
    "agile": {
        "intent": "question.agile",
        "utterances": [
            "What is your experience with Agile methodology?",
            "Are you familiar with agile development methodologies?"
        ],
        "answers": []
    },
    "versioncontrol": {
        "intent": "question.versioncontrol",
        "utterances": [
            "What is your experience with version control systems?"
        ],
        "answers": []
    },
    "codequality": {
        "intent": "question.codequality",
        "utterances": [
            "What is your experience with testing and quality assurance?",
            "Are you familiar with software testing methodologies?",
            "Have you worked with unit testing frameworks like JUnit or NUnit?"
        ],
        "answers": []
    },
    "softwaredevelopment": {
        "intent": "question.softwaredevelopment",
        "utterances": [
            "Have you ever worked on a remote software development team?",
            "What is your experience with software development for IoT devices?"
        ],
        "answers": []
    },
    "codingstyle": {
        "intent": "question.codingstyle",
        "utterances": [
            "Are you familiar with software development best practices?"
        ],
        "answers": []
    },
    "coding": {
        "intent": "question.coding",
        "utterances": [
            "Are you familiar with coding standards and guidelines?"
        ],
        "answers": []
    },
    "code review": {
        "intent": "question.code review",
        "utterances": [
            "Are you familiar with code review processes?",
            "What is your experience with code review?",
            "Have you worked with code review tools like Crucible or CodeCollaborator?"
        ],
        "answers": []
    },
    "scala": {
        "intent": "question.scala",
        "utterances": [
            "Are you familiar with scalability considerations in software development?"
        ],
        "answers": []
    },
    "browser": {
        "intent": "question.browser",
        "utterances": [
            "What is your experience with cross-browser compatibility issues?",
            "Do you have experience with CSS?",
            "Do you have experience with CSS?",
            "Have you worked with CSS preprocessors like SASS or LESS?"
        ],
        "answers": []
    },
    "elasticsearch": {
        "intent": "question.elasticsearch",
        "utterances": [
            "What is your experience with search engine optimization (SEO)?",
            "Do you have experience with ElasticSearch?",
            "Have you ever implemented a search engine?",
            "Have you used Elasticsearch for search functionality?",
            "Have you ever built a search engine using Elasticsearch?",
            "Have you ever implemented a search engine using Solr?",
            "Have you worked with search engine optimization (SEO) techniques?",
            "Have you ever used Elasticsearch for search functionality?"
        ],
        "answers": []
    },
    "continuous integration": {
        "intent": "question.continuous integration",
        "utterances": [
            "What is your experience with continuous integration and continuous deployment?",
            "Are you experienced with CI/CD pipelines?",
            "Have you worked with continuous integration/continuous deployment (CI/CD) tools?"
        ],
        "answers": []
    },
    "containers": {
        "intent": "question.containers",
        "utterances": [
            "What is your experience with containerization technologies?"
        ],
        "answers": []
    },
    "microservices": {
        "intent": "question.microservices",
        "utterances": [
            "What is your experience with microservices architecture?",
            "Have you built applications using microservices architecture?",
            "Have you ever built a microservices architecture?"
        ],
        "answers": []
    },
    "machine learning": {
        "intent": "question.machine learning",
        "utterances": [
            "Are you familiar with machine learning and artificial intelligence technologies?",
            "Have you ever used TensorFlow for machine learning?",
            "Have you worked with machine learning or artificial intelligence technologies?",
            "Have you ever implemented machine learning models in a production environment?"
        ],
        "answers": []
    },
    "blockchain": {
        "intent": "question.blockchain",
        "utterances": [
            "Are you familiar with blockchain technologies?",
            "Have you ever worked with blockchain technology?",
            "Have you ever worked with smart contracts?"
        ],
        "answers": []
    },
    "css": {
        "intent": "question.css",
        "utterances": [
            "Are you familiar with serverless computing?",
            "Are you familiar with serverless architecture?",
            "Do you have experience with serverless architectures?"
        ],
        "answers": []
    },
    "devops": {
        "intent": "question.devops",
        "utterances": [
            "What is your experience with DevOps practices?"
        ],
        "answers": []
    },
    "react": {
        "intent": "question.react",
        "utterances": [
            "What is your experience with front-end frameworks such as React or Angular?",
            "Do you have experience with React?",
            "Do you have experience with React Native?",
            "Do you have experience with React?",
            "Do you have experience with React Native?",
            "Have you worked with frontend frameworks like Angular, React, or Vue.js?",
            "Have you worked with reactive programming frameworks like Akka or Spring Reactor?"
        ],
        "answers": []
    },
    "nodejs": {
        "intent": "question.nodejs",
        "utterances": [
            "What is your experience with back-end frameworks such as Node.js or Django?",
            "Do you have experience with Node.js?",
            "Do you have experience with Node.js?"
        ],
        "answers": []
    },
    "algorithms": {
        "intent": "question.algorithms",
        "utterances": [
            "What is your experience with data structures and algorithms?"
        ],
        "answers": []
    },
    "programming": {
        "intent": "question.programming",
        "utterances": [
            "What is your experience with object-oriented programming?",
            "What is your experience with functional programming?",
            "What is your experience with pair programming?",
            "What is your experience with peer programming?"
        ],
        "answers": []
    },
    "unit testing": {
        "intent": "question.unit testing",
        "utterances": [
            "What is your experience with test-driven development?",
            "Do you have experience with test-driven development (TDD)?"
        ],
        "answers": []
    },
    "design patterns": {
        "intent": "question.design patterns",
        "utterances": [
            "Are you familiar with design patterns in software development?"
        ],
        "answers": []
    },
    "aws": {
        "intent": "question.aws",
        "utterances": [
            "What is your experience with cloud computing platforms such as AWS or Azure?",
            "Do you have experience with AWS?",
            "Do you have experience with Amazon Web Services (AWS)?",
            "Do you have experience with AWS?",
            "Do you have experience with Amazon Web Services (AWS)?",
            "Have you used AWS Lambda for serverless computing?",
            "Have you worked with AWS DynamoDB before?",
            "Have you ever used AWS ECS for container orchestration?",
            "Have you worked with cloud-based databases like AWS RDS or Azure SQL?",
            "Have you worked with software as a service (SaaS) platforms like AWS Lambda or Google Cloud Functions?",
            "Have you worked with event-driven architectures like AWS Lambda or Azure Event Grid?"
        ],
        "answers": []
    },
    "docker": {
        "intent": "question.docker",
        "utterances": [
            "What is your experience with container orchestration tools such as Kubernetes or Docker Swarm?",
            "Do you have experience with Docker?",
            "Do you have experience with Docker?",
            "Do you have experience with Docker?",
            "Do you have experience with Docker?",
            "Have you worked with Docker Compose for local development?",
            "Have you worked with containerization technologies like Docker?",
            "Have you ever implemented containerization with Docker?"
        ],
        "answers": []
    },
    "infrastructure": {
        "intent": "question.infrastructure",
        "utterances": [
            "What is your experience with infrastructure as code?"
        ],
        "answers": []
    },
    "loadbalancing": {
        "intent": "question.loadbalancing",
        "utterances": [
            "What is your experience with load balancing?"
        ],
        "answers": []
    },
    "frontend": {
        "intent": "question.frontend",
        "utterances": [
            "Do you have experience with Angular?",
            "Do you have experience with Angular?"
        ],
        "answers": []
    },
    "vuejs": {
        "intent": "question.vuejs",
        "utterances": [
            "Do you have experience with Vue.js?",
            "Do you have experience with Vue.js?"
        ],
        "answers": []
    },
    "express.js": {
        "intent": "question.express.js",
        "utterances": [
            "Do you have experience with Express.js?",
            "Do you have experience with Express.js?"
        ],
        "answers": []
    },
    "django": {
        "intent": "question.django",
        "utterances": [
            "Do you have experience with Django?",
            "Do you have experience with Django?"
        ],
        "answers": []
    },
    "flask": {
        "intent": "question.flask",
        "utterances": [
            "Do you have experience with Flask?",
            "Do you have experience with Flask?"
        ],
        "answers": []
    },
    "ruby": {
        "intent": "question.ruby",
        "utterances": [
            "Do you have experience with Ruby on Rails?",
            "Do you have experience with Ruby on Rails?"
        ],
        "answers": []
    },
    "laravel": {
        "intent": "question.laravel",
        "utterances": [
            "Do you have experience with Laravel?",
            "Do you have experience with Laravel?"
        ],
        "answers": []
    },
    "c#": {
        "intent": "question.c#",
        "utterances": [
            "Do you have experience with ASP.NET?",
            "Do you have experience with .NET Core?",
            "Do you have experience with ASP.NET?",
            "Do you have experience with .NET Core?"
        ],
        "answers": []
    },
    "java": {
        "intent": "question.java",
        "utterances": [
            "Do you have experience with Java?",
            "Do you have experience with JavaScript?",
            "Do you have experience with Java?",
            "Do you have experience with JavaScript?"
        ],
        "answers": []
    },
    "python": {
        "intent": "question.python",
        "utterances": [
            "Do you have experience with Python?",
            "Do you have experience with Python?"
        ],
        "answers": []
    },
    "php": {
        "intent": "question.php",
        "utterances": [
            "Do you have experience with PHP?",
            "Do you have experience with PHP?"
        ],
        "answers": []
    },
    "typescript": {
        "intent": "question.typescript",
        "utterances": [
            "Do you have experience with TypeScript?",
            "Do you have experience with TypeScript?"
        ],
        "answers": []
    },
    "html": {
        "intent": "question.html",
        "utterances": [
            "Do you have experience with HTML?",
            "Do you have experience with HTML?"
        ],
        "answers": []
    },
    "sql": {
        "intent": "question.sql",
        "utterances": [
            "Do you have experience with SQL?",
            "Do you have experience with SQL?",
            "Do you have experience with MySQL?",
            "Do you have experience with PostgreSQL?",
            "Do you have experience with Microsoft SQL Server?",
            "Do you have experience with SQL?",
            "Do you have experience with MySQL?",
            "Do you have experience with PostgreSQL?",
            "Do you have experience with Microsoft SQL Server?"
        ],
        "answers": []
    },
    "database": {
        "intent": "question.database",
        "utterances": [
            "Do you have experience with NoSQL databases?",
            "Do you have experience with NoSQL databases?",
            "Have you worked with relational databases before?",
            "Have you worked with non-relational databases before?",
            "Have you worked with a graph database before?",
            "Have you ever optimized database performance?"
        ],
        "answers": []
    },
    "azure": {
        "intent": "question.azure",
        "utterances": [
            "Do you have experience with Azure?",
            "Do you have experience with Microsoft Azure?",
            "Do you have experience with Azure?",
            "Do you have experience with Microsoft Azure?",
            "Have you worked with platform as a service (PaaS) platforms like Heroku or Azure App Service?"
        ],
        "answers": []
    },
    "kubernetes": {
        "intent": "question.kubernetes",
        "utterances": [
            "Do you have experience with Kubernetes?",
            "Do you have experience with Kubernetes?",
            "Do you have experience with Kubernetes?",
            "Do you have experience with Kubernetes?",
            "Have you used Kubernetes for container orchestration?",
            "Have you worked with container orchestration tools like Kubernetes or Amazon ECS?",
            "Have you ever used Kubernetes for container orchestration?"
        ],
        "answers": []
    },
    "continuousintegration": {
        "intent": "question.continuousintegration",
        "utterances": [
            "Do you have experience with Jenkins?",
            "Do you have experience with Jenkins?",
            "Do you have experience with Travis CI?",
            "Do you have experience with CircleCI?",
            "Do you have experience with Jenkins?",
            "Do you have experience with Jenkins?",
            "Do you have experience with Travis CI?",
            "Do you have experience with CircleCI?"
        ],
        "answers": []
    },
    "git": {
        "intent": "question.git",
        "utterances": [
            "Do you have experience with Git?",
            "Do you have experience with GitHub?",
            "Do you have experience with GitLab CI/CD?",
            "Do you have experience with GitHub Actions?",
            "Do you have experience with Git?",
            "Do you have experience with Git?",
            "Do you have experience with GitHub?",
            "Do you have experience with GitLab CI/CD?",
            "Do you have experience with GitHub Actions?",
            "Do you have experience with Git?",
            "Do you have experience with version control systems like Git or SVN?"
        ],
        "answers": []
    },
    "jira": {
        "intent": "question.jira",
        "utterances": [
            "Do you have experience with Jira?",
            "Do you have experience with Jira?"
        ],
        "answers": []
    },
    "zoom": {
        "intent": "question.zoom",
        "utterances": [
            "Do you have experience with Zoom?",
            "Do you have experience with Zoom?"
        ],
        "answers": []
    },
    "integration testing": {
        "intent": "question.integration testing",
        "utterances": [
            "Do you have experience with Selenium?",
            "Do you have experience with Selenium?"
        ],
        "answers": []
    },
    "ios development": {
        "intent": "question.ios development",
        "utterances": [
            "Do you have experience with Swift?",
            "Do you have experience with Swift?"
        ],
        "answers": []
    },
    "kotlin": {
        "intent": "question.kotlin",
        "utterances": [
            "Do you have experience with Kotlin?",
            "Do you have experience with Kotlin?"
        ],
        "answers": []
    },
    "spring": {
        "intent": "question.spring",
        "utterances": [
            "Do you have experience with Spring Framework?",
            "Do you have experience with Spring Framework?"
        ],
        "answers": []
    },
    "mongodb": {
        "intent": "question.mongodb",
        "utterances": [
            "Do you have experience with MongoDB?",
            "Do you have experience with MongoDB?",
            "Do you have experience with MongoDB?",
            "Do you have experience with MongoDB?",
            "Have you ever worked with a NoSQL database such as Cassandra or MongoDB?"
        ],
        "answers": []
    },
    "cache": {
        "intent": "question.cache",
        "utterances": [
            "Do you have experience with Redis?",
            "Do you have experience with Redis?",
            "Do you have experience with Redis?",
            "Do you have experience with Redis?",
            "Have you used Redis for caching before?",
            "Have you worked with distributed caching solutions like Redis?"
        ],
        "answers": []
    },
    "ansible": {
        "intent": "question.ansible",
        "utterances": [
            "Do you have experience with Ansible?",
            "Do you have experience with Ansible?"
        ],
        "answers": []
    },
    "oracle": {
        "intent": "question.oracle",
        "utterances": [
            "Do you have experience with Oracle?",
            "Do you have experience with Oracle?"
        ],
        "answers": []
    },
    "graphql": {
        "intent": "question.graphql",
        "utterances": [
            "Have you worked with GraphQL before?",
            "Have you worked with GraphQL before?"
        ],
        "answers": []
    },
    "datascience": {
        "intent": "question.datascience",
        "utterances": [
            "Have you used PyTorch for deep learning?"
        ],
        "answers": []
    },
    "architecture": {
        "intent": "question.architecture",
        "utterances": [
            "Have you ever built a microservice architecture?"
        ],
        "answers": []
    },
    "bigdata": {
        "intent": "question.bigdata",
        "utterances": [
            "Have you worked with Apache Spark before?"
        ],
        "answers": []
    },
    "naturallanguageprocessing": {
        "intent": "question.naturallanguageprocessing",
        "utterances": [
            "Have you ever written a custom NLP algorithm?"
        ],
        "answers": []
    },
    "hadoop": {
        "intent": "question.hadoop",
        "utterances": [
            "Have you ever used the Hadoop ecosystem for big data processing?",
            "Have you ever worked with big data technologies such as Hadoop or Spark?"
        ],
        "answers": []
    },
    "apache": {
        "intent": "question.apache",
        "utterances": [
            "Have you ever worked with Apache Flink for stream processing?",
            "Have you ever worked with Apache Beam for batch processing?"
        ],
        "answers": []
    },
    "authentication": {
        "intent": "question.authentication",
        "utterances": [
            "Have you worked with OAuth or OpenID Connect before?",
            "Have you ever implemented OAuth2 authentication?",
            "Have you ever implemented user authentication and authorization?"
        ],
        "answers": []
    },
    "automation": {
        "intent": "question.automation",
        "utterances": [
            "Have you worked with build automation tools like Maven or Gradle?",
            "Have you worked with marketing automation tools like Marketo or HubSpot?"
        ],
        "answers": []
    },
    "mobile": {
        "intent": "question.mobile",
        "utterances": [
            "Have you worked with responsive design and/or mobile-first development?"
        ],
        "answers": []
    },
    "deployment": {
        "intent": "question.deployment",
        "utterances": [
            "Have you worked with automated deployment tools like Octopus Deploy or Bamboo?"
        ],
        "answers": []
    },
    "virtualization": {
        "intent": "question.virtualization",
        "utterances": [
            "Have you worked with virtualization technologies like VMWare or Hyper-V?"
        ],
        "answers": []
    },
    "ios": {
        "intent": "question.ios",
        "utterances": [
            "Have you worked with monitoring tools like Nagios or Zabbix?"
        ],
        "answers": []
    },
    "hyperledger": {
        "intent": "question.hyperledger",
        "utterances": [
            "Have you worked with blockchain technologies like Ethereum or Hyperledger?"
        ],
        "answers": []
    },
    "virtualreality": {
        "intent": "question.virtualreality",
        "utterances": [
            "Have you worked with augmented or virtual reality technologies?",
            "Have you ever worked with augmented reality (AR) or virtual reality (VR)?"
        ],
        "answers": []
    },
    "gamedevelopment": {
        "intent": "question.gamedevelopment",
        "utterances": [
            "Have you worked with game development engines like Unity or Unreal Engine?"
        ],
        "answers": []
    },
    "data analysis": {
        "intent": "question.data analysis",
        "utterances": [
            "Have you worked with data visualization libraries like D3.js or Highcharts?",
            "Have you ever worked with a data visualization tool such as Tableau or Power BI?"
        ],
        "answers": []
    },
    "encryption": {
        "intent": "question.encryption",
        "utterances": [
            "Have you ever implemented cryptography techniques such as encryption or hashing?"
        ],
        "answers": []
    },
    "gameengine": {
        "intent": "question.gameengine",
        "utterances": [
            "Have you ever built a game using Unity or another game engine?"
        ],
        "answers": []
    },
    "healthcare": {
        "intent": "question.healthcare",
        "utterances": [
            "Have you ever built a software product for the healthcare industry?"
        ],
        "answers": []
    }
};