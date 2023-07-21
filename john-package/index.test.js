process.env['NODE_DEV'] = 'TEST';

const { 
    getTextractAnalysis, extractForms, extractTables, fixTableHeaders, fixFormHeaders 
} = require('./index.js');
// const a = require('./index.js')

var inp; var out; // variables where we will store the intended input and output

const tableDict = { // this is a sample dict to be used for 
    headers: ['Invoice ID', 'Issued Date', 'Due Date', 'Amount'],
    mapping: {
    'Ref No':'Invoice ID', 'Ref And Particulars':'Invoice ID', 'Tax Invoice':'Invoice ID', 
    'Document No':'Invoice ID', 'Doc No':'Invoice ID', 'References':'Invoice ID', 'No':'Invoice ID', 
    'Invoice No CN NO':'Invoice ID', 'Invoice no':'Invoice ID', 'REF':'Invoice ID', 
    'Inv No':'Invoice ID', 'DOCUMENT NO':'Invoice ID', 'DOCUMENT NUMBER':'Invoice ID', 
    'Our Ref':'Invoice ID', 'Document No':'Invoice ID', 'No':'Invoice ID', 'Reference':'Invoice ID',
    'Balance':'Amount', 'Accumulated Balance':'Amount', 'Balance Amount':'Amount', 
    'Document Amount':'Amount', 'Amount':'Amount', 'BALANCE':'Amount', 
    'Accumulated balanceFunctional currency':'Amount', 
    'Accum Balance':'Amount', 'OUTSTANDING BALANCE':'Amount',    
    'Date':'Issued Date', 'DATE':'Issued Date', 'TranDate':'Issued Date', 'Posting Date':'Issued Date', 
    '单据日期':'Issued Date', 'Invoice Date':'Issued Date',

        'Due Date':'Due Date'
   }
}

const formDict = {
    headers:['Company Registration Number', 'GST Registration Number', 'Date'],
    mapping:{
        'Company Registration Number':'Company Registration Number',
        'Company Reg No':'Company Registration Number',

        'GST Registration Number':'GST Registration Number',
        'GST Reg No':'GST Registration Number', 
        'GST Registration No':'GST Registration Number',
        'GST No':'GST Registration Number',

        'Date':'Date',
        '日付':'Date'

    }

};

// test test
test("Sanity check", () => {
    expect(true).toBe(true);
});
/// Test the textract function - make sure it works

/// Test the Form getting functions
console.log('TEST FORM FIXHEADERS')
// contains all of the headers

test ('all form headers present', () => {
    inp = {
    'Company Registration Number':'aaa', 'GST Registration Number':'bbb', 'Date':'ccc'
    };
    out = {
    'Company Registration Number':'aaa', 'GST Registration Number':'bbb', 'Date':'ccc'
    };
    res = fixFormHeaders(inp, formDict);
    expect(res).toEqual(out);
});
// contains none of the headers
inp = {
    'hi lol':'a', 'loln':'b'
}
out = {
'Company Registration Number':'', 'GST Registration Number':'', 'Date':''
}
// contains some of the headers
inp = {
'company reg no':'aaa', 'date':'ccc'
}
out = {
'Company Registration Number':'aaa', 'GST Registration Number':'', 'Date':'ccc'
};
// header names are misspelled
inp = {
'Com Reg n':'aaa', 'GS TRegistration Number':'bbb', 'Dae':'ccc'
};

out = {
'Company Registration Number':'aaa', 'GST Registration Number':'bbb', 'Date':'ccc'
};

// header names are misspelled (again)
inp = {
'Com Reg n':'aaa', 'GS TRegistration o':'bbb', '日':'ccc'
};

out = {
'Company Registration Number':'aaa', 'GST Registration Number':'bbb', 'Date':'ccc'
}

/// Test the Table getting functions
// contains all fields, same length
inp = {
    'Invoice ID':[1, 2], 
    'Issued Date':[3,4], 
    'Due Date':[5,6], 
    'Amount':[7,8]
}
out = {
    'Invoice ID':[1, 2], 
    'Issued Date':[3,4], 
    'Due Date':[5,6], 
    'Amount':[7,8]
}

// contains all fields, same length (again)
inp = {
    'our ref':[1, 2], 
    '单据日期':[3,4], 
    'Due Date':[5,6], 
    'Accumulated Balance':[7,8]
}
out = {
    'Invoice ID':[1, 2], 
    'Issued Date':[3,4], 
    'Due Date':[5,6], 
    'Amount':[7,8]
}

// contains none of the fields
inp = {
    'stnaretnoeisrantseine':[1, 2], 
    'vtneraiovernae':[3,4], 
    'rstnareinstei':[5,6], 
    'vrnseianrsein':[7,8],
}
out = {
    'Invoice ID':[], 
    'Issued Date':[], 
    'Due Date':[], 
    'Amount':[]
}
// contains some fields, and mixed lengths
inp = {
    'Invoice ID':[1, 2, 1, 1, 1, 1], 
    'Issued Date':[], 
    'Due Date':[5], 
}
out = {
    'Invoice ID':[1, 2, 1, 1, 1, 1], 
    'Issued Date':['','','','','',''], 
    'Due Date':[5,'','','','',''],  
    'Amount':['','','','','','']
}

// contains misspelled field names
inp = {
    'IniceD':[1, 2], 
    'Isud ate':[3,4], 
    'Du ate':[5,6], 
    'Amon':[7,8]
}
out = {
    'Invoice ID':[1, 2], 
    'Issued Date':[3,4], 
    'Due Date':[5,6], 
    'Amount':[7,8]
}

// contains misspelled field names (again)
inp = {
    'Invo':[1, 2], 
    '单日':[3,4], 
    'Duate':[5,6], 
    'balan':[7,8]
}
out = {
    'Invoice ID':[1, 2], 
    'Issued Date':[3,4], 
    'Due Date':[5,6], 
    'Amount':[7,8]
}

