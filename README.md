## 🚀 Hackingly Node.js + MongoDB App

This is a simple Node.js application using Express and MongoDB, containerized with Docker. It supports basic user operations via REST API and is configured for CI/CD deployment to an EC2 instance using GitHub Actions.

---

### 📁 Project Structure

```
.
├── index.js               # Express app with MongoDB
├── Dockerfile             # Docker image definition
├── docker-compose.yml     # Compose for Node and MongoDB
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions deployment workflow
├── README.md
└── package.json
```

---

## 🛠️ Prerequisites

Make sure you have the following installed:

* [Docker](https://www.docker.com/)
* [Docker Compose v2](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/)
* AWS EC2 instance (Ubuntu)
* SSH key pair for EC2 access

---

## ⚙️ Setup (Local)

1. **Clone the repository**

```bash
git clone https://github.com/microaditi/devops_task_hackingly.git
cd devops_task_hackingly
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app locally**

Ensure MongoDB is running locally or update the `mongoose.connect` string.

```bash
node index.js
```

Visit `http://localhost:3000/health`.

---

## 🐳 Docker Setup (Local)

1. **Build and run with Docker Compose**

```bash
docker compose up --build
```

2. **Check containers**

```bash
docker ps
```

3. **Access the API**

* Health check: `http://localhost:3000/health`
* Create user (POST): `http://localhost:3000/user`
* List users (GET): `http://localhost:3000/users`

---

## ☁️ Deployment via GitHub Actions

The project is configured to automatically deploy to your EC2 instance on push to the `main` branch.

### 🔐 Required GitHub Secrets

In your GitHub repo, go to **Settings → Secrets → Actions**, and add the following:

| Secret Name           | Description                       |
| --------------------- | --------------------------------- |
| `DOCKER_PASSWORD`     | Your Docker Hub password or token |
| `EC2_SSH_PRIVATE_KEY` | Private SSH key for EC2 access    |

> 📝 You are using hardcoded username `Qwerty` and IP `10.213.11.1` in the workflow.

---

### 📦 How Deployment Works

1. On push to `main`, GitHub Actions will:

   * Build and push the Docker image to Docker Hub (`microaditi/my-app:latest`)
   * SSH into the EC2 instance at `13.219.82.40`
   * Run `docker-compose` to pull and restart the containers

---

## 📁 EC2 Setup Instructions

On your EC2 instance (Ubuntu):

1. **Install Docker & Docker Compose**

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo usermod -aG docker ubuntu
```

Install Docker Compose v2:

```bash
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.24.2/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
```

2. **Clone your repo and set up**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

3. **Create `docker-compose.yml`** if not already present.

4. **Start your app manually (optional)**

```bash
docker compose up -d
```

---

## 📬 API Endpoints

* `GET /health` – health check
* `POST /user` – create user => curl -X POST http://localhost:3000/user   -H "Content-Type: application/json"   -d '{"name": "X", "email": "X@hackingly.com"}'
* `GET /users` – list users (name + email only)

---

## ✅ License

MIT

---

Let me know if you want the `README.md` updated to include environment variables, multi-environment deploys (staging/production), or MongoDB Atlas support.
