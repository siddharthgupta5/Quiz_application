# Online Quiz System

It is a comprehensive online quiz system with user authentication and quiz management.


##  Features

- **Security & API Access Control:** JWT-based Authentication, Rate Limiting and Session Expiry.
- **User Authentication:** Secure login and registration system.
- **Quiz Management:** Admin panel for creating, tracking and updating quizzes.
- **Quiz Attempt:** Monitoring Quiz Attempts and Scores.


##  Tech Stack

- **Frontend:** React JS
- **Backend:** Python(Django)
- **Database:** MySQL
- **Payment Integration:** Stripe


##  Backend Setup (Django & MySQL)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharthgupta5/Food_Ordering_Website.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd backend
   ```
3. **Install the dependencies:**
   ```sh
   python -m venv venv
   source venv/bin/activate   # For Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
4. **Set up environment variables:**
   - Create a .env file in the backend/ directory:
   - Add the following variables:
     ```
     SECRET_KEY=your_secret_key_here
     DEBUG=True
     DB_NAME=quiz_db
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_HOST=localhost
     DB_PORT=3306
     ```

5. **Apply Migrations & Start Server:**
   ```sh
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser  # Create an admin user
   python manage.py runserver
   ```
Backend is now running at http://127.0.0.1:8000/

##  Frontend Setup (React.js)

1. **Open a new terminal and Navigate to the project directory:**
   ```sh
   cd frontend
   ```
2. **Install the dependencies:**
   ```sh
   npm install
   ```
3. **Configure .env File:**
   ```
   REACT_APP_API_URL=http://127.0.0.1:8000/api
   ```
4. **Start React Development Server:**
   ```
   npm start
   ```

Frontend is now running at http://localhost:3000/ 🚀



##  API Endpoints

### Authentication
   ```
   | Method |        Endpoint           | Description               |
   |--------|---------------------------|---------------------------|
   | POST   |    /api/register/         | Register new user         |
   | POST   |    /api/login/            | User login (returns JWT)  |
   
   ```
### Quiz Management
   ```
   | Method |        Endpoint           | Description               |
   |--------|---------------------------|---------------------------|
   | GET    | /api/quizzes/             | List all quizzes          |
   | POST   | /api/quizzes/             | Create a new quiz (Admin) |
   | GET    | /api/quizzes/{id}/        | Get quiz details          |
   | POST   | /api/quizzes/{id}/start/  | Start a quiz              |
   | POST   | /api/quizzes/{id}/submit/ | Submit quiz responses     |
   ```


##  Contributing

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name
3. Commit changes: git commit -m "Added feature"
4. Push to GitHub: git push origin feature-name
5. Create a pull request.

