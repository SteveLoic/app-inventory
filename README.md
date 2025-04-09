# 🚀 Full-Stack-Anwendung: Spring Boot + Angular + Docker Compose

Dieses Projekt kombiniert ein Spring Boot-Backend mit einem Angular-Frontend, das mit **Docker Compose** orchestriert wird.

---

## 🧰 Voraussetzungen

Bitte stelle sicher, dass folgende Tools installiert sind:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) [Node.js & Angular CLI](https://angular.io/cli) – für lokale Frontend-Entwicklung
- (Optional) [Java 17+] – für lokale Backend-Entwicklung

---

## 📁 Projektstruktur

## ⚙️ Anwendung starten mit Docker Compose

Im Hauptverzeichnis des Projekts:

```bash
docker-compose up --build
```

Dadurch werden:

Das Spring Boot Backend auf http://localhost:5150 bereitgestellt

Das Angular Frontend auf http://localhost:8080 bereitgestellt

Das Swagger OpenAPI auf http://localhost:5051/api/v1/swagger-ui/index.html bereitgestellt
