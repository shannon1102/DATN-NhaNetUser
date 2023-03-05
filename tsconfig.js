{
    "compilerOptions": {
      "baseUrl": "src",
      "paths": {
        "types": ["types"],
        "store": ["store"],
        "*": [
            "node_modules/*",
            "src/typings/*" // this will make the typescript compiler find the type file
        ]
      }
    },
    "include": [
      "src"
    ]
  }