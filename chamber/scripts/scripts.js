
async function loadMembers(view = 'grid') {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, view);
}

// Members
function displayMembers(members, view) {
    const directory = document.querySelector('#directory');
    directory.className = view; 
    directory.innerHTML = ''; 

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membership}</p>
        `;
        directory.appendChild(card);
    });
}


document.querySelector('#gridView').addEventListener('click', () => loadMembers('grid'));
document.querySelector('#listView').addEventListener('click', () => loadMembers('list'));


document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;


loadMembers();