from django.db import models

class Employee(models.Model):
    employee_name = models.CharField(max_length=255)
    employee_position = models.CharField(max_length=255)

    def __str__(self):
        return self.employee_name

class Department(models.Model):
    department_name = models.CharField(max_length=255)
    # Diagram shows EmployeeID FK inside Department table (Many Departments -> One Employee)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    def __str__(self):
        return self.department_name

class Project(models.Model):
    project_name = models.CharField(max_length=255)
    # Diagram shows Department_ID FK inside Project table with "One to One" label
    department = models.OneToOneField(Department, on_delete=models.CASCADE)
    # Diagram shows "Many to Many" between Employee and Project
    employees = models.ManyToManyField(Employee)

    def __str__(self):
        return self.project_name