const formDesigner = document.getElementById('form-designer');
let formElements = [];

// Add Input
document.getElementById('add-input').addEventListener('click', () => {
    addElement('input', 'Inputs Label', 'Enter placeholder...');
});

// Add Select
document.getElementById('add-select').addEventListener('click', () => {
    addElement('select', 'Select Label', ['Option 1', 'Option 2', 'Option 3']);
});

// Add Textarea
document.getElementById('add-textarea').addEventListener('click', () => {
    addElement('textarea', 'Texts - Area ', 'Enter text...');
});

// Function to add form elements
function addElement(type, label, placeholderOrOptions) {
    const id = Math.random().toString(36).substring(7);
    let elementHtml = '';

    if (type === 'input') {
        elementHtml = `
            <label contenteditable="true">${label}</label>
            <input type="text" placeholder="${placeholderOrOptions}" />
        `;
    } else if (type === 'select') {
        elementHtml = `
            <label contenteditable="true">${label}</label>
            <select>${placeholderOrOptions.map(option => `<option>${option}</option>`).join('')}</select>
        `;
    } else if (type === 'textarea') {
        elementHtml = `
            <label contenteditable="true">${label}</label>
            <textarea placeholder="${placeholderOrOptions}"></textarea>
        `;
    }

    const formElementDiv = document.createElement('div');
    formElementDiv.classList.add('form-element');
    formElementDiv.innerHTML = `${elementHtml} 
        <button class="delete-btn" onclick="deleteElement('${id}')">Delete</button>`;
    formElementDiv.dataset.id = id;

    formDesigner.appendChild(formElementDiv);

    formElements.push({
        id,
        type,
        label,
        ...(type === 'select' ? { options: placeholderOrOptions } : { placeholder: placeholderOrOptions })
    });
}

// Delete function
function deleteElement(id) {
    formElements = formElements.filter(element => element.id !== id);
    const elementToDelete = document.querySelector(`[data-id="${id}"]`);
    elementToDelete.remove();
}

// Save form - Log as JSON
document.getElementById('save-form').addEventListener('click', () => {
    console.log(JSON.stringify(formElements, null, 2));
});

// Enable drag-and-drop using Sortable.js
new Sortable(formDesigner, {
    animation: 150,
    onEnd: function (evt) {
        const elementNodes = Array.from(formDesigner.children);
        formElements = elementNodes.map(node => {
            const id = node.dataset.id;
            return formElements.find(element => element.id === id);
        });
    }
});
