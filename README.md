# 🚀 SaaS Boilerplate with Node.js, TypeScript, PostgreSQL & Drizzle ORM

This repository provides a **scalable and modular SaaS boilerplate** built with **Node.js** and **TypeScript**, leveraging **PostgreSQL schemas** for multi-tenancy and **Drizzle ORM** for type-safe database interactions.

---

## **🔹 Key Features:**

✅ **TypeScript-first** – Strongly typed, maintainable, and modern.  
✅ **Drizzle ORM** – Lightweight, SQL-first ORM with full TypeScript support.  
✅ **PostgreSQL Schemas** – Efficient multi-tenancy and data isolation.  
✅ **Scalable Architecture** – Modular design for growing SaaS applications.  
✅ **Extensible** – Easily customizable for different business models.

---

## **🚀 Getting Started**

### **1. Clone the Repository**

```sh
git clone https://github.com/ajitaro/saas-node.git
cd saas-node
```

### **2. Set Up Environment Variables**

Copy the `.env.example` file to a new `.env` file in the project root and configure your environment variables. Also, ensure you have a `./env/.db.env` file for database configuration.

Example **`.env`**:

```env
DATABASE_URL=postgres://user:password@localhost:5432/your_db
```

Example **`./env/.db.env`**:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db
```

---

### **3. Run PostgreSQL in Docker**

To start the **PostgreSQL database** using Docker, run:

```sh
docker-compose up -d
```

This will:

- Pull the latest **PostgreSQL 16 Alpine** image
- Start the database using the environment variables in `./env/.db.env`
- Persist database data using **Docker volumes**

To check if the database is running:

```sh
docker ps
```

To stop the database:

```sh
docker-compose down
```

---

### **4. Install Dependencies & Start the Project**

```sh
yarn
yarn dev
```

---

### **💡 Notes:**

- Ensure **Docker** and **Docker Compose** are installed on your system.
- The database will be exposed on `localhost:5432`.
- If you update the `docker-compose.yml` file, restart the containers with `docker-compose up --force-recreate -d`.

---

💡 **Contributions & Feedback are Welcome!** 🚀
