# Employee & Project Management System – Django REST Framework

A simple CRUD-based system for managing company records, departments, and project assignments using Django and Django REST Framework.

## Features

* **Employee Management:** specific tracking of employee details and positions.
* **Department Management:** Organize departments and assign heads.
* **Project Management:** Track projects and link them to specific departments.
* **Complex Relationships:** Handles Many-to-Many (Employees ↔ Projects) and One-to-One (Project ↔ Department) associations.
* **RESTful API:** Full CRUD operations via standard HTTP methods.
* **SQLite Database:** Lightweight database for development.

## Tech Stack

* Python
* Django
* Django REST Framework

## Screenshots



## How to Run

Follow these steps to set up the project locally.

### 1. Create and Activate Virtual Environment
```bash
python -m venv venv
source venv/bin/activate

```

### 2. Install Dependencies

```bash
pip install django djangorestframework

```

### 3. Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate

```

### 4. Run the Server

```bash
python manage.py runserver

```

Access the API at: `http://127.0.0.1:8000/api/`

## API Endpoints

| Endpoint | Description | Methods Allowed |
| --- | --- | --- |
| `/api/employees/` | List/Create employees | `GET`, `POST` |
| `/api/employees/{id}/` | Employee details | `GET`, `PUT`, `PATCH`, `DELETE` |
| `/api/departments/` | List/Create departments | `GET`, `POST` |
| `/api/departments/{id}/` | Department details | `GET`, `PUT`, `PATCH`, `DELETE` |
| `/api/projects/` | List/Create projects | `GET`, `POST` |
| `/api/projects/{id}/` | Project details | `GET`, `PUT`, `PATCH`, `DELETE` |

## Database Schema (ERD)

Based on the project requirements:

* **Employee:** `employee_name`, `employee_position`
* **Department:** `department_name`, `employee` (FK - Department Head)
* **Project:** `project_name`, `department` (One-to-One), `employees` (Many-to-Many)
