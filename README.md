# HubSpot-Inspired Application with Django and React

## **Overview**
This application is designed as a simplified HubSpot-inspired platform. It allows users to:
- Fetch contacts from the database or an external API.
- Fetch deals and manage them.
- Link contacts to deals.
- Provide a basic dashboard with authentication.

The app is built using Django for the backend and React for the frontend.

---

## **Features**
1. **Authentication**:
   - User  login.
   - 

2. **Contacts Management**:
   - Fetch and display a list of contacts.


3. **Deals Management**:
   - Fetch and display a list of deals.


4. **Linking Contacts to Deals**:
   - Associate a contact with one or more deals.
  

5. **Dashboard**:
   - A clean and simple dashboard to visualize data.


---

## **Technologies Used**
### Backend (Django):
- **Django REST Framework**: To create APIs for contacts, deals, and user authentication.
- **SQLite** 
- **Django ORM**: For database interactions.

### Frontend (React):
- **React.js**: For building a dynamic and responsive UI.
- **Axios**: For making API requests.
- **React Router**: For client-side routing.


---

## **Installation and Setup**


### Backend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/hubspot-django-react.git
   cd hubspot-django-react/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup:
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---




