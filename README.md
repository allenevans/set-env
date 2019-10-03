# set-env
Github action to set environment variables that can be globally accessed between steps.

Example usage:-

```
name: example-pipeline
on: [pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1
      
      - name: set environment variables
        uses: allenevans/set-env@v1.0.0
        with:
          MY_ENV_VAR: 'my value'

      - name: Printenv
        run: |
          echo "MY_ENV_VAR=${MY_ENV_VAR}"
          printenv
```

Notes:-
* You can set more than one variable at a time e.g.
    ```
    - name: set many environment variables
      uses: allenevans/set-env@v1.0.0
      with:
        VAR_A: abc
        VAR_B: def
        VAR_C: ghi
    ```
* Environment variable names are converted to UPPER_SNAKE_CASE by default e.g.
  ```
    myVar: abc => MYVAR=abc
    with space: abc => WITH_SPACE=abc
  ```
