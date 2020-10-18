module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFilesAfterEnv: [
        "@testing-library/react/cleanup-after-each",
        "@testing-library/jest-dom/extend-expect"
    ],
    preset: 'ts-jest',
    testMatch: ['<rootDir>/src/**/*.test.tsx'],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}
