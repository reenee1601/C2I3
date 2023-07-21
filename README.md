## This is the package to perform OCR and extract form data/tables
## To use this you'll need to put the john-package in your node modules folder and run `npm i` to get the dependancies
## Also you need to have valid aws credentials in your aws credentials directory

# Installation
Download the package somewhere, then in your project folder, run: \
`npm i 'path/to/john-package'`

# Usage
The main point of this package is to go from an image to a standardised object. So you'll get an object with the names you want, containing (probably) the fields that you want. It uses the `fuzzysort` package to do autocorrect on field names, which may or may not catch everything

### Notes on dict object mapping
In the functions, all non-language non-whitespace characters are removed, so for the keys, just put what you see on the physical document minus the non-language characters.\
eg. `Invoice.No` becomes `InvoiceNo`. `ref \no.` becomes `ref no`

## Getting raw Textract output from an image
`async function getTextractAnalysis(filepath)`\
filepath is relative or absolute path to the file you want to analyse (JPEG, PNG, TIFF, and PDF formats)
returns an object (which is the raw textract results)

extra info: what this function does is read the file, upload it onto an s3 bucket, run analysis, then delete from s3 bucket

## Getting form data ie. key-value pairs
`extractForms(data, dict)`\
`data` is the raw Textract data from the textract analysis (that you got from the previous function)\
`dict` is a dictionary detailing the fields you want to extract. The format is as follows:\
{\
    &nbsp;&nbsp; "headers": array of header names you want to have in your final data\
    &nbsp;&nbsp; "mapping": {\
    &nbsp;&nbsp;&nbsp;&nbsp;    'header name that you think will be in the original data': 'header name that you want in the final data' (this has to be one of the values in the "headers" attribute above)\
    &nbsp;&nbsp;}\
}

## Getting table data
`extractTables(data, dict)`\
`data` is the raw Textract data from the textract analysis (that you got from the previous function)\
`dict` is a dictionary detailing the fields you want to extract. The format is as follows:\
{\
    &nbsp;&nbsp; "headers": array of header names you want to have in your final data\
    &nbsp;&nbsp; "mapping": {\
    &nbsp;&nbsp;&nbsp;&nbsp;    'header name that you think will be in the original data': 'header name that you want in the final data' (this has to be one of the values in the "headers" attribute above)\
    &nbsp;&nbsp;}\
}


## Examples
### Get raw data from the file `files/invoice.pdf`
In an async function\
`data = await getTextractAnalysis('files/invoice.pdf')`

### Get form data
`dict = {`\
&nbsp;&nbsp;&nbsp;&nbsp;`"headers": ['invoice number', 'date', 'total amount']`\
&nbsp;&nbsp;&nbsp;&nbsp; `"mapping": {`\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `'invoice no':'invoice number', 'invoice number':'invoice number'`\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `'date':'date'`'\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `'total amount':'total amount', 'grand total':'total amount'`\
&nbsp;&nbsp;&nbsp;&nbsp;`}`\
`}`\
`formData = extractForms(data, dict)`
