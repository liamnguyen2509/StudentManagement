# Student Management

Student Management is a practice project. It enable student can register and we manage the student list.

## Architect layers
- Repository pattern (apply clean architect)
- Layers:
  - Application: Contains View and Controller and configuration for Web App
  - Services: Contains Business function as Service class 
  - Repositories: Contains list of Domain Entities, Repository and IoC Unit Of Work Pattern
  - UnitTest: Implement Unit Testing for Service class layer  

## Built With
* [Bootstrap](https://getbootstrap.com)
* .NET Framework 4.8
* ASP.NET MVC 5
* Unity for Dependency Injection
* Microsoft UnitTest Project
* AutoMapper for mapping Entities with ViewModels
* Serilog for write logs to Database

## Prerequisites
Before you begin, ensure you have met the following requirements:
* You have installed the [.NET Framework 4.8](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net481)
* You have installed MSSQL Server (any version)
* You have installed [Git](https://git-scm.com/downloads)
* You have installed Visual Studio (at lease version 2019)

## Installation
1. Copy this URL: https://github.com/liamnguyen2509/StudentManagement.git
2. Open Git Bash
3. Change the current working directory to the location where you want the cloned directory.
4. Type git clone, and then paste the URL you copied earlier.
```bash
git clone https://github.com/liamnguyen2509/StudentManagement.git
```
5. Press Enter to create your local clone.

## Usage
1. Open the Solution by Visual Studio
2. Please clean the Solution then try to rebuild it
3. Explore the StudentManagement.App project and open the file Web.config
4. Open Package Manager Console with default project is StudentManagement.Repositories
5. Run the command
```bash
Update-Database -verbose
```
6. Go to your local database and check is there new Database name StudentDB and data for Subjects
7. Set Start up project is StudentManagement.App and run project as IISExpress

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
