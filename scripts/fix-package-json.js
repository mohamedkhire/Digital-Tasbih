const fs = require("fs")
const path = require("path")

// Path to the package.json file
const packageJsonPath = path.join(process.cwd(), "package.json")

try {
  // Read the package.json file
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  // Check if there are duplicate dependencies
  if (packageJson.dependencies && packageJson.dependencies["@types/react"]) {
    console.log("Removing @types/react from dependencies")
    delete packageJson.dependencies["@types/react"]
  }

  if (packageJson.dependencies && packageJson.dependencies["@types/react-dom"]) {
    console.log("Removing @types/react-dom from dependencies")
    delete packageJson.dependencies["@types/react-dom"]
  }

  // Make sure these are only in devDependencies
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {}
  }

  packageJson.devDependencies["@types/react"] = "^18"
  packageJson.devDependencies["@types/react-dom"] = "^18"

  // Add date-fns to fix peer dependency warning
  packageJson.dependencies["date-fns"] = "^4.1.0"

  // Write the updated package.json file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log("Successfully updated package.json")
} catch (error) {
  console.error("Error updating package.json:", error)
  process.exit(1)
}

