# WildlifeEDU

## Let's Care for Our Wildlife Together

### Description
WildlifEdu is an online education platform focused on animal conservation, with special attention to endangered species in Africa. The main goal of this platform is to collaborate with local communities, conservation organizations, and specialists to promote sustainable wildlife conservation. Additionally, it encourages eco-tourism by actively involving people in conservation efforts. WildlifeEDU leverages digital technology and innovation to support various conservation projects, serving as a blueprint for future conservation efforts within similar ecosystems.

### Link to GitHub Repository
[GitHub Repository](https://github.com/Mugisha-Beline/WildlifeEDU_Capstone.git)  

---

## Tech Stack
- **Frontend**: React.js
- **Backend**: Django (Python), Stripe API for payment processing
- **Database & Hosting**: Firebase for database and deployment of the frontend

---

## Setup and Installation Guide

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (for the frontend React app)
- **Python** (for Django backend)
- **Firebase CLI** (for deployment and database management)
- **Docker** (for containerization)

### Installation Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mugisha-Beline/WildlifeEDU_Capstone.git
   cd WildlifEdu
   ```

2. **Install Dependencies**  
   - For the React frontend, run:
     ```bash
     cd frontend
     npm install
     ```
   - For the Django backend, create a virtual environment and install dependencies:
     ```bash
     cd backend
     python3 -m venv env
     source env/bin/activate  # On Windows, use `env\Scripts\activate`
     pip install -r requirements.txt
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in both the frontend and backend directories to include necessary API keys, Firebase configurations, Stripe keys, and other environment-specific settings.

     Example `.env` for Firebase:
     ```dotenv
     apiKey: "AIzaSyDi5B9roo9nQ0VFfb4sWDrZM0WpIYKiqPQ",
  authDomain: "wildlifedu-website.firebaseapp.com",
  projectId: "wildlifedu-website",
  storageBucket: "wildlifedu-website.appspot.com",
  messagingSenderId: "252121860688",
  appId: "1:252121860688:web:c8bec950ce14ce8f7b5f55",
  measurementId: "G-F5F9G7KD78",
     ```

     Example `.env` for Django Backend:
     ```dotenv
     SECRET_KEY=your_django_secret_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```

4. **Database Setup**
   - Ensure Firebase is set up with Firestore, and configure your Firestore rules as needed.
   - For Django migrations, run the following command:
     ```bash
     python manage.py migrate
     ```

5. **Run the Applications**
   - Start the React frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Start the Django backend:
     ```bash
     cd backend
     python manage.py runserver
     ```

6. **Access the Application**
   - Open your browser and go to `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend to interact with the application.

---

## Designs
- **Figma Mockups**  
  Access the design mockups for the platform here: [Figma Mockups](https://www.figma.com/design/BE9F2PnRlQDYmncrDeQkdR/Capstone-Project-Design?node-id=0-1&t=qyaXhublQVzqeQk3-1)

---

## Deployment Plan
The platform is built to be flexible and secure, supporting both cloud and on-premises deployments. Below are instructions for Docker-based deployment and cloud hosting using Firebase and Heroku.

### 1. Docker Deployment
   - Create a `Dockerfile` and `docker-compose.yml` to enable multi-container deployments (frontend, backend, database).
   - Example `Dockerfile` for Django backend:
     ```dockerfile
     # Dockerfile
     FROM python:3.9-slim
     WORKDIR /app
     COPY . /app
     RUN pip install -r requirements.txt
     CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
     ```
   - Example `docker-compose.yml`:
     ```yaml
     version: '3'
     services:
       frontend:
         build:
           context: ./frontend
         ports:
           - "3000:3000"
       backend:
         build:
           context: ./backend
         ports:
           - "8000:8000"
     ```
   - Run Docker Compose:
     ```bash
     docker-compose up --build
     ```

### 2. Cloud Deployment

   #### Firebase (Frontend)
   - Ensure the Firebase CLI is installed and logged in:
     ```bash
     firebase login
     ```
   - Initialize Firebase in your project:
     ```bash
     firebase init
     ```
   - Deploy the frontend:
     ```bash
     firebase deploy --only hosting
     ```

   #### Heroku (Backend)
   - Ensure Heroku CLI is installed and logged in:
     ```bash
     heroku login
     ```
   - Create a new Heroku app and deploy the backend:
     ```bash
     heroku create wildlifEdu-backend
     git push heroku main
     ```
   - Configure environment variables in the Heroku dashboard or via the CLI:
     ```bash
     heroku config:set SECRET_KEY=django_secret_key STRIPE_SECRET_KEY=stripe_secret_key
     ```

3. **Monitoring and Logging**
   - Configure Firebase Analytics for tracking and logging.
   - Set up *Heroku Logs* to monitor backend performance and errors in real-time:
     ```bash
     heroku logs --tail
     ```

4. **Final Deployment**
   - Once local testing is complete, configure the domain settings, add SSL for secure communication, and finalize deployment.

---

## Running Commands Summary
### Development
- Frontend: `npm start` (in `/frontend`)
- Backend: `python manage.py runserver` (in `/backend`)

### Docker
- Build and Run: `docker-compose up --build`
  
### Firebase Deployment
- Deploy Frontend: `firebase deploy --only hosting`

### Heroku Deployment
- Deploy Backend: `git push heroku main`

---

## License
This project is open-source and available under the MIT License.
