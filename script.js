// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const filterDropdownToggle = document.getElementById('filterDropdownToggle');
    const filterDropdownMenu = document.getElementById('filterDropdownMenu');
    const filterDropdownItems = document.querySelectorAll('.filter-dropdown-item');
    const filterDropdownSelectedLogo = document.getElementById('filterDropdownSelectedLogo');
    const filterDropdownSelectedText = document.getElementById('filterDropdownSelectedText');

    // Logo mapping
    const logoMap = {
        'All': null,
        'DAE': 'images/DAE.png',
        'CATIA': 'images/CATIA.png',
        'CATIA Composer': 'images/CATIAComposer.png',
        'SolidWorks': 'images/Solidworks.png',
        'Pointwise': 'images/Pointwise.png',
        'ANSYS': 'images/Ansys.png',
        'Tecplot': 'images/Tecplot.png',
        'MATLAB': 'images/MATLAB.png',
        'Simulink': 'images/Simulink.png'
    };

    // Desktop filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            applyFilter(filterValue);
        });
    });

    // Mobile dropdown toggle
    if (filterDropdownToggle) {
        filterDropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            filterDropdownMenu.classList.toggle('active');
        });
    }

    // Mobile dropdown items
    filterDropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const filterValue = this.getAttribute('data-filter');
            applyFilter(filterValue);
            
            // Update dropdown active state
            filterDropdownItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Update selected text and logo
            filterDropdownSelectedText.textContent = filterValue;
            const logoSrc = logoMap[filterValue];
            if (logoSrc) {
                filterDropdownSelectedLogo.src = logoSrc;
                filterDropdownSelectedLogo.alt = filterValue;
                filterDropdownSelectedLogo.style.display = 'block';
            } else {
                filterDropdownSelectedLogo.style.display = 'none';
            }
            
            // Close dropdown
            filterDropdownMenu.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.filter-dropdown-wrapper')) {
            filterDropdownMenu.classList.remove('active');
        }
    });

    // Filter function
    function applyFilter(filterValue) {
        // Update active button (desktop)
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.filter-btn[data-filter="${filterValue}"]`)?.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
            if (filterValue === 'All') {
                card.classList.remove('hidden');
            } else {
                const cardSoftware = card.getAttribute('data-software');
                if (cardSoftware.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    }
});
