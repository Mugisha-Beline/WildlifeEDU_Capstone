# WildlifeEDU

# WildlifeEDU: Let's Care for Our Wildlife Together

## Description
WildlifeEDU is an online animal conservation education-based website with special attention to endangered species in Africa. The main goal of this platform is to work with the local population, nature care institutions, and specialists for the purposes of sustainable conservation. In addition, it seeks to promote eco-tourism by involving people to conserve the wildlife. Using the digital technology and innovation, WildlifeEDU is engaged in the implementation of the wildlife conservation projects and it serves as a blueprint in the future wildlife conservation endeavors in the same ecosystems.

## Link to GitHub Repository
[GitHub Repository](https://github.com/Mugisha-Beline/WildlifeEDU_Capstone.git)  

## How to Set Up the Environment and Project

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (for the backend)
- **Python** (Django for the backend)

### Installation Steps
1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**  
   For a Node.js-based backend, run:  
   ```bash
   npm install
   ``` 

5. **Run the Application**  
   To start the development server, run:  
   ```bash
   npm start # Node.js
   python app.py # Django
   ```

6. **Access the Application**  
   Open your browser and go to `http://localhost:3000` (or another port as defined in your settings) to view the app.

### Designs
- **Figma Mockups**  
   The designs for the platform can be accessed via this Figma link: [Figma Mockups](https://www.figma.com/design/BE9F2PnRlQDYmncrDeQkdR/Capstone-Project-Design?node-id=0-1&t=qyaXhublQVzqeQk3-1)  

### Deployment Plan
The platform is built to be elastic and secure when implemented whether on the cloud or on premises. A brief summary of the deployment strategy is below:

1. **Docker Deployment**  
   Create a `Dockerfile` and `docker-compose.yml` for multi-container deployments (backend, database).
   ```bash
   docker-compose up --build
   ```

2. **Cloud Deployment**  
   For cloud-based hosting, Heroku will be used.
   - **AWS EC2**: Use an EC2 instance to run the app and configure security groups for API access.
   - **RDS**: For database management, use AWS RDS for MongoDB Atlas.
   - **Heroku**: For a quick and scalable deployment option, deploy the backend directly to Heroku and configure environment variables within the Heroku dashboard.
   ```bash
   git push heroku main
   ```

3. **Monitoring and Logging**  
   Set up **CloudWatch** or **Stackdriver** to monitor application performance and log errors in real-time. This ensures the application runs smoothly post-deployment.

4. **Final Deployment**  
  Once the application has undergone local testing and all issues have been ironed out, the last phase will entail Adjusting domain settings and enabling Secure socket layer for the purposes of security communication.
