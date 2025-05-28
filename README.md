# MiLista - Sistema de Gestión de Tareas con Kubernetes y Docker

MiLista es una aplicación web que permite a los usuarios gestionar tareas personales. Está compuesta por un frontend en React y un backend en Node.js, integrados con MySQL, Docker y Kubernetes.

---

## Tecnologías Utilizadas

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Base de Datos**: MySQL
- **Contenedores**: Docker & Docker Compose
- **Orquestación**: Kubernetes (Minikube)
- **Autenticación**: OAuth 2.0 con Google
- **API REST** para interacción entre frontend y backend

---

## Estructura del Proyecto


milista/
│
├── backend/             # API y lógica de negocio (Node.js)
├── frontend/            # Interfaz de usuario (React)
├── k8s/                 # Manifiestos de Kubernetes (Deployment, Service, Ingress)
├── db/                  # Scripts de base de datos
├── docker-compose.yml   # Definición local de servicios
└── .gitignore
```

---

## Despliegue Local con Docker


# Inicia todos los servicios en local
docker-compose up -d
```

Accede desde: [http://localhost:5173](http://localhost:5173)

---

## Despliegue en Kubernetes (Minikube)

### 1. Inicia Minikube

minikube start


### 2. Aplica los manifiestos

kubectl apply -f mysql-init-configmap.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml

kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f backend-secret.yaml

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

kubectl apply -f ingress.yaml


### 3. Habilita el túnel de Minikube


minikube tunnel


Accede a la aplicación desde: `http://localhost` (gracias al recurso Ingress)

---


## Autor

Desarrollado por **Jhonatan Alva, Jefferson Molina, Guillermo Guitierrez, Luis Bran**  
Proyecto de Ingeniería de Software - 2025  