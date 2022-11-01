# variable-substitution

## Action Parameters
```YAML
- name: 'Get json subbed'
  id: subbed
  uses: "snsinahub-org/variable-substitution@v1.0.0"
  with:
  
    # List of variables
    
    # Required: false
    # Default: json
    fileFormat: json
    
    # Description: you can pass nested JSON keys by separating them with delimiter
    # for instance
    # {
    #    "parent": {
    #      "child-1": {
    #        "child-2": "value-of-child-2"
    #      }
    #    }
    # }
    # to change child-2 with '.' delimiter: you can pass
    # 'parent.child-1.child-2'
    # Required: false
    # Default: '/'    
    delimiter: '.'
    
    # Description: path to input JSON or XML file (now just JSON is supported
    # Required: false
    # Default: '/' 
    filePath: sample.json
    
    # Description: force github action write json/xml output to a file on github action runner server
    # Required: false
    # Default: true
    writeToFile: true
    
    # Description: path to json/xml file
    # Required: false
    # Default: '/tmp/sub.json'
    outputFile: '/tmp/sub.json'
    
    # Description: list of variables will be original values replacements
    # It is an array of objects, each object has a key and a value
    # Required: true
    # Default: ''
    # exanple: to have multile line variables please use `>` in front of variables and then add array of objects from next line
    variables: > 
      [ 
          {
              "key": "Serilog.WriteTo.2.Args.path",
              "value": "D:\\tmp\\Logs\\WorkdayPay_.log"
          },
          {
              "key": "Workday.PostPayment.username",
              "value": "snsina"
          },
          {
              "key": "Converge.ssl_pins.Oregon Health Authority - Paid",
              "value": "200"
          },
          {
              "key": "Serilog.MinimumLevel.Default",
              "value": "Debug"
          }
      ]
```

## Example
```YAML
    - name: checkout
        uses: actions/checkout@v3
    - name: 'Get json subbed'
        id: subbed
        uses: "snsinahub-org/variable-substitution@v1.0.0"
        with:
          fileFormat: json
          delimiter: '.'
          filePath: sample.json
          writeToFile: true
          outputFile: '/tmp/sub.json'
          variables: > 
            [ 
                {
                    "key": "Serilog.WriteTo.2.Args.path",
                    "value": "D:\\tmp\\Logs\\WorkdayPay_.log"
                },
                {
                    "key": "Workday.PostPayment.username",
                    "value": "snsina"
                },
                {
                    "key": "Converge.ssl_pins.Oregon Health Authority - Paid",
                    "value": "200"
                },
                {
                    "key": "Serilog.MinimumLevel.Default",
                    "value": "Debug"
                }
            ]
      - name: 'print subbed 1'        
        run: |
          node -e "console.log(decodeURIComponent('${{ steps.subbed.outputs.subbed }}'))" | python3 -m json.tool
      - name: 'print subbed 2'        
        run: |
          python3 -m json.tool /tmp/sub.json
```
