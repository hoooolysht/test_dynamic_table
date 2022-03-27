window.onload = function(){

const model = {"employees":[
   {"First Name":"Augustus", "Second Name":"Bullet", "Age":"35", "Salary" : "5000", "Location" : "Lawrenceburg"},
   {"First Name":"Donald", "Second Name":"MacCabe", "Age":"28", "Salary" : "4900", "Location" : "Port Ellen"},
   {"First Name":"Timur", "Second Name":"Kharidov", "Age":"18", "Salary" : "2500", "Location" : "Moscow"},
   {"First Name":"Sandra", "Second Name":"Santos", "Age":"18", "Salary" : "2550", "Location" : "Vila Nova de Gaia"},
   {"First Name":"Jim", "Second Name":"Porter", "Age":"22", "Salary" : "3100", "Location" : "Newcastle"},
   ]}; 
  const octopus = {
      createTable: function(){
         return model.employees;          
      },
      addEmployee: function(keys, values){
         let obj = {};
         keys.forEach((key, i) => { obj[key] = values[i]        
         });
         model.employees.push(obj);
      },
      deleteEmployee: function(obj){
          const objIndex = model.employees.findIndex( el => el.name ===obj.name);
          model.employees.splice(objIndex, 1);
         tableView.remove();
      },
      debounce: function(callback, wait){
        let timeout;
        return(...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(function(){ callback.apply(this,args)}, wait);
        }
      },
      editEmployee: function(valueUpdated, i, key){
         const objUpdated = model.employees[i];
           objUpdated[key] = valueUpdated;
           model.employees.splice(i, 1, objUpdated);
           tableView.remove();
      },

      objConstructor: function(){

      }
     };

    const tableView = {
        
    init: function(){
        
       this.body = document.getElementsByTagName('body')[0];
       this.container = document.createElement('div');
       this.container.setAttribute('id','cont');
       this.body.appendChild(this.container);
     
       this.button = document.createElement('button');
       this.button.setAttribute('id', 'add');
       this.button.innerHTML = 'Add New Row';
       this.button.addEventListener('click', (e)=> {this.add()});
       this.body.appendChild(this.button);

       this.button = document.createElement('button');
       this.button.setAttribute('id', 'save');
       this.button.innerHTML = 'Save New Row';
       this.button.addEventListener('click', (e)=> {this.save()});
       this.body.appendChild(this.button);
       

       this.render();
     },
 

    render: function(){
      this.table = document.createElement('table'); 
      this.table.setAttribute('id', 'better');
      
      let data = octopus.createTable();
      this.data = data;
      for( let i = 0; i < data.length; i++){

      this.tableRow = document.createElement('tr');
       let keys = Object.keys(data[0]);
       this.keys = keys;  
       let values = Object.values(data[i]);  
      
       for (let j = 0; j < keys.length; j++) {
          
          if(i == 0){
            let tableHead = document.createElement('th');
            let header = keys[j];
            let textNode = document.createTextNode(header);
            tableHead.appendChild(textNode);
            this.tableRow.appendChild(tableHead);
            this.table.appendChild(tableHead);
            
             }
           this.cell = document.createElement('td');
           let dataValue = values[j];
             if( j > 1 && j < 5 ){
              this.cell.setAttribute('contenteditable', 'true');
              this.cell.addEventListener('keyup', octopus.debounce((e) => { 
                   
                 const valueUpdated = (e.target.innerText);
                octopus.editEmployee(valueUpdated, i, keys[j]);
               }, 5000)
               )
             } 
            let cellText = document.createTextNode(dataValue); 
             this.cell.appendChild(cellText);
             this.tableRow.appendChild(this.cell); 
           }
           this.tableRow.setAttribute('class','rowDelete');
           
           this.tableRow.addEventListener('dblclick', function(e){
               octopus.deleteEmployee(data[i]);
            
           });

            this.table.appendChild(this.tableRow);
           this.container.appendChild(this.table); 
        
           }
         
       },
       remove: function(){
        this.table.remove();
        this.render();
       },
       add: function(){
      const tableRef = document.getElementById('better').insertRow(-1);
       for (let k = 0; k < this.keys.length; k++){
         
          this.cell = document.createElement('td');
          this.cell.setAttribute('contenteditable', 'true');
          this.cell.setAttribute('class', 'newcell');
          tableRef.appendChild(this.cell); 
          this.tableRef = tableRef;
         }
    
       },
      save: function(){
        const valuesArr = [];
        let td = this.tableRef.childNodes;
          for( let l = 0; l < td.length; l++){
            valuesArr.push(td[l].innerHTML);
          }
          octopus.addEmployee(this.keys, valuesArr);
          this.table.remove();
          this.render();
      }
   }

  tableView.init();

};

