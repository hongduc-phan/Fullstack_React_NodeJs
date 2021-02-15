process.env.SECRET_OR_KEY = '12345'
process.env.IMAGES_CDN_ENDPOINT = 'test-endpoint'

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    coverageReporters: ['lcov', 'text', 'cobertura'],
    reporters: [
        "default",
        [
          "jest-junit",
            {
                "outputDirectory": "./coverage",
                "outputName": "coverage.xml"
            }
        ]
      ] 
};