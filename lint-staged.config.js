export default {
    "**/*.php*": [
        "vendor/bin/duster lint"
    ],
    'resources/js/**/*.{js,ts,jsx,tsx}': [
      'npm run lint'
    ]
}
