# Étape 1 : Build du backend Spring Boot avec Maven
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build

WORKDIR /app

# Installer Node.js et npm
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@11.3.0

# Copier tout le projet dans l'image Docker
COPY . /app

# Construire le projet Maven
RUN mvn -f /app/pom.xml clean install -Pprod -DskipTests

# Étape 2 : Créer une image légère pour exécuter l'application
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Mettre à jour les paquets Alpine
RUN apk --no-cache upgrade

# Copier le fichier JAR généré depuis l'étape précédente
COPY --from=backend-build /app/depotHopital/target/depotHopital-0.0.1-SNAPSHOT.jar /app/depotHopital.jar

# Exposer le port 8080
EXPOSE 8080

# Commande pour exécuter l'application
CMD ["java", "-jar", "depotHopital.jar"]
