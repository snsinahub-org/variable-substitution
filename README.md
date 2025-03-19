# variable-substitution
An action to substitue variables in `JSON` and `XML` files

## Action Parameters
```YAML
- name: 'Get json subbed'
  id: subbed
  uses: "snsinahub-org/variable-substitution@v4.0.3"
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

    # Skip empty values, set to false to keep empty values to be replaced
    # Required: true
    # Default: true
    # NOTE: it is supported for XML only, this feature will be added to JSON in future
    skip-empty: true
    
    # Description: list of variables will be original values replacements
    # It is an array of objects, each object has a key and a value
    # Required: true
    # Default: ''
    # exanple: to have multile line variables please use `>` in front of variables and then add array of objects from next line
    variables: > 
      [ 
          {
              "key": "companies.0.company.about",
              "value": "Siavash Namvar"
          },
          {
              "key": "companies.0.company.testimonials.1.position",
              "value": "This is the Position"
          },
          {
              "key": "companies.6.company.galleryImages.1",
              "value": "snsina.com"
          }
      ]
```

## Output
```YAML
  # Output is a JSON or XML string  
  subbed: 
```

## Examples
### JSON

```YAML
    - name: checkout
        uses: actions/checkout@v3
    - name: 'Get json subbed'
        id: subbed
        uses: "snsinahub-org/variable-substitution@v4.0.3"
        with:
          fileFormat: json
          delimiter: '.'
          filePath: sample.json
          writeToFile: true
          outputFile: '/tmp/sub.json'
          variables: > 
            [ 
                {
                    "key": "companies.0.company.about",
                    "value": "Siavash Namvar"
                },
                {
                    "key": "companies.0.company.testimonials.1.position",
                    "value": "This is the Position"
                },
                {
                    "key": "companies.6.company.galleryImages.1",
                    "value": "snsina.com"
                }
            ]
      - name: 'print subbed 1'        
        run: |
          node -e "console.log(decodeURIComponent('${{ steps.subbed.outputs.subbed }}'))" | python3 -m json.tool
      - name: 'print subbed 2'        
        run: |
          python3 -m json.tool /tmp/sub.json
```
### XML
To substitute an attribute in XML object you need to prpened `@_` to the key name . For instance if you'd like to change `username` and `password` in following XML snippet and delimiter is `.`, you can pass this `configurations.configuration.items.add`

```xml
 <configurations>
  <configuration>
    <items>
      <add key="username" value="username_value"/>
      <add key="password" value="password_value"/>
    <items>
  </configuration>
</configurations>
```
To change username and password, `variables` looks like:
```
variables: >
  [
      {
        "element": "configurations.configuration.items.add",
        "matchingKey": "@_key",
        "matchingValue": "username",
        "updatingKey": "@_value",
        "value": "snsinahub"          
      },
      {
        "element": "configurations.configuration.items.add",
        "matchingKey": "@_key",
        "matchingValue": "password",
        "updatingKey": "@_value",
        "value": "password123"          
      }
  ]
```
And XML will look like
```xml
 <configurations>
  <configuration>
    <items>
      <add key="username" value="snsinahub"/>
      <add key="password" value="password123"/>
    <items>
  </configuration>
</configurations>
```

### Sample of gitub workflow to change XML

```YAML
      - name: checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0          
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: 'Get xml subbed'
        id: subbed
        uses: "snsinahub-org/variable-substitution@v4.0.3"
        with:
          fileFormat: xml
          delimiter: '.'
          filePath: sample.xml
          writeToFile: true
          skip-empty: true
          outputFile: '/tmp/sub.xml'
          variables: > 
            [
                {
                  "element": "configurations.configuration.items.add",
                  "matchingKey": "@_key",
                  "matchingValue": "username",
                  "updatingKey": "@_value",
                  "value": "snsinahub"          
                },
                {
                  "element": "configurations.configuration.items.add",
                  "matchingKey": "@_key",
                  "matchingValue": "password",
                  "updatingKey": "@_value",
                  "value": "password123"          
                }
            ]
      - name: 'print subbed 1'        
        run: |
          echo ${{ steps.subbed.outputs.subbed }} | python3 -c 'import sys; import xml.dom.minidom; s=sys.stdin.read(); print(xml.dom.minidom.parseString(s).toprettyxml())' | sed -r '/^\s*$/d'
      - name: 'print subbed 2'        
        run: |
          cat /tmp/sub.xml
```
