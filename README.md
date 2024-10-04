# WildlifeEDU

# WildlifeEDU: Let's Care for Our Wildlife Together

## Description
WildlifeEDU is a digital platform designed to educate and raise awareness about wildlife conservation, with a particular focus on endangered species in Africa. The platform is aimed at partnering with local communities, nature care organizations, and experts to promote sustainable conservation techniques. It also encourages eco-tourism by engaging people in wildlife protection efforts. Through the use of digital innovation and technology, WildlifeEDU supports wildlife conservation projects and serves as a model for future efforts across similar ecosystems.

## Link to GitHub Repository
[GitHub Repository](https://github.com/Mugisha-Beline/WildlifeEDU.git)  

## How to Set Up the Environment and Project

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (for the backend if it is built using JavaScript frameworks like Express)
- **Python** (if using Flask/Django for the backend)
- **MongoDB/PostgreSQL** (depending on your database)
- **Docker** (optional but recommended for containerization)

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
   For a Python-based backend, set up a virtual environment and install requirements:  
   ```bash
   python3 -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and include the necessary API keys, database credentials, and environment-specific settings like:
   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=yourusername
   DB_PASS=yourpassword
   ```

4. **Database Setup**  
   Create the necessary database tables by running the migrations or initializing the database schema:
   ```bash
   npm run db:migrate # for Node.js-based apps
   python manage.py migrate # for Django/Flask apps
   ```

5. **Run the Application**  
   To start the development server, run:  
   ```bash
   npm start # Node.js
   python app.py # Flask/Django
   ```

6. **Access the Application**  
   Open your browser and go to `http://localhost:3000` (or another port as defined in your settings) to view the app.

### Designs
- **Figma Mockups**  
   The designs for the platform can be accessed via this Figma link: [Figma Mockups](#)  
   *(Note: Replace `#` with the actual Figma link to the mockups)*

- **Screenshots of App Interfaces**  
   ![WildlifeEDU Interface](./screenshots/interface1.png)  
   ![WildlifeEDU Interface](./screenshots/interface2.png)

### Deployment Plan
The platform is designed to be scalable and secure for deployment in both cloud-based environments and local servers. Here's an outline of the deployment plan:

1. **Docker Deployment**  
   Use Docker to containerize the application for easy deployment. Ensure Docker and Docker Compose are installed.  
   Create a `Dockerfile` and `docker-compose.yml` for multi-container deployments (backend, database, etc.).
   ```bash
   docker-compose up --build
   ```

2. **Cloud Deployment**  
   For cloud-based hosting, platforms like AWS or Heroku can be used.
   - **AWS EC2**: Use an EC2 instance to run the app and configure security groups for API access.
   - **RDS**: For database management, use AWS RDS for PostgreSQL or MongoDB Atlas for MongoDB.
   - **S3**: Use Amazon S3 to store and serve static assets like images and videos.
   - **Heroku**: For a quick and scalable deployment option, deploy the backend directly to Heroku and configure environment variables within the Heroku dashboard.
   ```bash
   git push heroku main
   ```

3. **Monitoring and Logging**  
   Set up **CloudWatch** or **Stackdriver** to monitor application performance and log errors in real-time. This ensures the application runs smoothly post-deployment.

4. **Final Deployment**  
   After testing the app locally and resolving any issues, the final deployment will include configuring domain settings (if needed) and setting up SSL certificates for secure communication.
