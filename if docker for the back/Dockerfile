# Use the official .NET SDK image from Microsoft for .NET 8.0
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Restore dependencies
RUN dotnet restore

# Publish the project
RUN dotnet publish -c Release -o out

# Use the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Install ss (socket stat) for network diagnostics
RUN apt-get update && apt-get install -y iproute2 curl

WORKDIR /app
COPY --from=build /app/out .

# Expose port 80 to allow external traffic
EXPOSE 80

# Set the entry point for the application (API was the name of my backend folder)
ENTRYPOINT ["dotnet", "API.dll"]
