let total = 0;
        let records = [];
    
        function addRecord() {
            let inputTextField = document.getElementById("inputText");
            let inputNumberField = document.getElementById("inputNumber");
            let inputText = inputTextField.value.trim();
            let inputNumber = parseFloat(inputNumberField.value);
    
            if (!isNaN(inputNumber) && inputText !== "") {
                // Check if this is a new entry or an update
                let existingRecord = records.find(record => record.name === inputText);
                if (existingRecord) {
                    total -= existingRecord.number;
                    existingRecord.number = inputNumber;
                } else {
                    records.push({ name: inputText, number: inputNumber });
                }

                total += inputNumber;
                updateList();
    
                // Clear the input fields
                inputTextField.value = "";
                inputNumberField.value = "";
            } else {
                alert('Please input both name and a number of hours!');
            } 
            saveToLocalStorage();
        }

        function updateList() {
            // Update the total number
            document.getElementById("totalNumber").textContent = total;

            // Sort the records in descending order based on the number
            records.sort((a, b) => b.number - a.number);

            // Create a new list item for each record
            let list = document.getElementById("inputRecords");
            list.innerHTML = ''; // Clear existing list items
            for (let record of records) {
                let listItem = document.createElement("li");
                listItem.textContent = record.name + ": " + record.number + " ";
                
                // Create an edit button
                let editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = function() {
                    editRecord(record);
                };

                // Append the button to the list item
                listItem.appendChild(editButton);
                
                // Create a delete button
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = function() {
                    deleteRecord(record);
                };

                // Append the delete button to the list item
                listItem.appendChild(deleteButton);


                // Append the list item to the list
                list.appendChild(listItem);
            }   

        }

        function editRecord(recordToEdit) {
            let newName = prompt("Edit Name:", recordToEdit.name);
            let newNumber = prompt("Edit Number of Hours:", recordToEdit.number);

            if (newName !== null && newNumber !== null && !isNaN(newNumber)) {
                // Update the record
                recordToEdit.name = newName.trim();
                total -= recordToEdit.number;
                recordToEdit.number = parseFloat(newNumber);
                total += recordToEdit.number;

                // Re-render the list
                updateList();
            }
            saveToLocalStorage();
        }

        function saveToLocalStorage() {
    localStorage.setItem('records', JSON.stringify(records));
    localStorage.setItem('total', total.toString());
}

function loadFromLocalStorage() {
    let savedRecords = localStorage.getItem('records');
    let savedTotal = localStorage.getItem('total');

    if (savedRecords) {
        records = JSON.parse(savedRecords);
        total = parseFloat(savedTotal);
        updateList();
    }
}


function deleteRecord(recordToDelete) {
            // Confirm before deleting
            if (confirm("Are you sure you want to delete this record?")) {
                // Remove the record from the array
                records = records.filter(record => record !== recordToDelete);
                total -= recordToDelete.number;

                // Update the list and save to localStorage
                updateList();
                saveToLocalStorage();
            }
        }
window.onload = loadFromLocalStorage;
