var fs=require('fs');
var readline=require('readline');
var readfile=fs.createReadStream("Indicators.csv","utf8");
var writestream=fs.createWriteStream("final_result.json","utf8");
var writestream1=fs.createWriteStream("final_result1.json","utf8");
var MAP_COUNTRIES_ASIA = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];
//var jsonfile=require('jsonfile');
//var splitit=[];
//var csvread=fs.createReadStream("samplefile.csv");
var years=[];
var linebyline=readline.createInterface(
  {
    input: readfile,
  });


  var rows=[];
  var temp=[];
  var obj1=[];
  var array_2=[];
  var obj={};
  var obj2={};

  var headers=[];
  var n=0;
  var male_expect={};
  var female_expect={};
  var obj= new Object();
  linebyline.on('line',function(line)
  {
    rows=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if(n==0){
      headers=rows;
      n++;
      console.log(headers);
    }
    //old code
    /*else
    {
    if(((MAP_COUNTRIES_ASIA.indexOf(rows[0]))>=0)&&((rows[4]>=1960)||(rows[4]<=2015))&&(rows[3]=="SP.DYN.LE00.MA.IN"))
    {
    var obj=new Object();
    obj[headers[0]]=rows[0];
    obj[headers[4]]=rows[4];
    obj[headers[5]]=rows[5];
    obj1.push(obj);
  }
}
});*/
//new code
else
{
  if(((MAP_COUNTRIES_ASIA.indexOf(rows[0]))>=0)&&((rows[4]>=1960)||(rows[4]<=2015)))
  {
    if((rows[3]=="SP.DYN.LE00.IN")&&(!obj2[rows[1]]))
    {

      obj2[rows[0]]=parseFloat(rows[5]);

    }
    else if((rows[3]=="SP.DYN.LE00.IN"))
    {
      obj2[rows[0]]=parseFloat(obj2[rows[0]])+parseFloat(rows[5]);
    }


    else if((rows[3]=="SP.DYN.LE00.MA.IN")&&(!male_expect[rows[4]]))
    {
      male_expect[rows[4]]=rows[5];
    }
    else if((rows[3]=="SP.DYN.LE00.MA.IN"))
    {
      male_expect[rows[4]]=parseFloat(male_expect[rows[4]])+parseFloat(rows[5]);
    }
    else if((rows[3]=="SP.DYN.LE00.FE.IN")&&(!female_expect[rows[4]]))
    {
      female_expect[rows[4]]=rows[5];
    }
    else if((rows[3]=="SP.DYN.LE00.FE.IN"))
    {
      female_expect[rows[4]]=parseFloat(female_expect[rows[4]])+parseFloat(rows[5]);
    }
  }

}


});


linebyline.on('close',function(line)
{
  //array_2.push(obj2);
  //var num=0;
  for(var k in obj2)
  {

    var obj3= new Object();
    obj3["country"]=k;
    obj3["value"]=obj2[k];
    array_2.push(obj3);

  }
  var final_array=array_2.sort(function(a,b)
  {
    return a.value-b.value;

  });
  final_array=final_array.reverse();
  final_array.length=5;

  var male_array=[];
  for(var k in male_expect)
  {
    var male_record=new Object();
    male_record["year"]=k;
    male_record["valuem"]=male_expect[k];
    male_array.push(male_record);
  }
  var female_array=[];
  for(var k in female_expect)
  {
    var female_record=new Object();
    female_record["year"]=k;
    female_record["value"]=female_expect[k];
    female_array.push(female_record);
  }
  var key_year="1960";
  for(var i=0;i<male_array.length;i++)
  {
    var obj=new Object();
    obj["year"]=key_year;
    obj["male"]=male_array[i].valuem;
    obj["female"]=female_array[i].value;
    obj1.push(obj);
    var addit=parseFloat(key_year)+1;
    key_year=addit.toString();


  }
  writestream.write(JSON.stringify(obj1),"utf8");
  writestream1.write(JSON.stringify(final_array),"utf8");
});
/* var headers=rows[0].toString().split(",");  /*for(var i=1;i<rows.length;i++)
{
temp=rows[i].toString().split(",");
for(var j=0;j<temp.length;j++)
{
obj[headers[j]]=temp[j];
}
obj1.push(obj);
obj={};
}
//console.log(obj1);
var India_record=obj1.filter(function(obj1)
{
return obj1.country==="India"
});
//console.log(India_record);
country_name=obj1.map(function(obj1)
{
return obj1.country
});
//console.log(country_name);
jsonfile.writeFile('file.json',India_record,function(err){
return err;
});
JSON.stringify();*/
