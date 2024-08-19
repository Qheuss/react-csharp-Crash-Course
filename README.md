# https://www.youtube.com/watch?v=QC-XXwsDguw

<ol>
  <li>install .net sdk</li>
  <li>install SQL Server 2019: https://download.microsoft.com/download/7/c/1/7c14e92e-bdcb-4f89-b7cf-93543e7112d1/SqlLocalDB.msi</li>
  <li>install dotnet ef "dotnet tool install --global dotnet-ef"</li>
  <li>install extensions on vscode: .net extension pack, c# dev kit, c# extensions, nuget gallery, sql server (mssql), simple react snippets</li>
  <li>create project in a folder and initialise the backend api: "dotnet new webapi --use-controllers -o API"</li>
  <li>in the nuget gallery install on the project:
    <ul>
      <li>Microsoft.EntityFrameworkCore</li>
      <li>Microsoft.EntityFrameworkCore.Tools</li>
      <li>Microsoft.EntityFrameworkCore.SqlServer</li>
    </ul>
  </li>
  <li>After finished the data folder and models folder done with their files -> "dotnet ef migrations add Initial"</li>
  <li>Then "dotnet ef database update"</li>
  <li>Create the controller for you data</li>
  <li>Create the front-end app in the project folder -> "npm create vite@latest"</li>
</ol>
