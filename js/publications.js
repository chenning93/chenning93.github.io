// Publications Page JavaScript - Search and Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('pub-search');
    const yearFilter = document.getElementById('year-filter');
    const typeFilter = document.getElementById('type-filter');
    const resetButton = document.getElementById('reset-filters');
    const publicationsContainer = document.getElementById('publications-container');

    // Get all publication items
    const pubItems = document.querySelectorAll('.pub-item');
    const yearSections = document.querySelectorAll('.year-section');

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterPublications, 300));
    }

    // Filter functionality
    if (yearFilter) {
        yearFilter.addEventListener('change', filterPublications);
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', filterPublications);
    }

    // Reset filters
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            searchInput.value = '';
            yearFilter.value = 'all';
            typeFilter.value = 'all';
            filterPublications();
        });
    }

    function filterPublications() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedYear = yearFilter ? yearFilter.value : 'all';
        const selectedType = typeFilter ? typeFilter.value : 'all';

        let visibleCount = 0;
        const yearVisibility = {};

        pubItems.forEach(item => {
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const authors = item.querySelector('.authors')?.textContent.toLowerCase() || '';
            const itemYear = item.closest('.year-section')?.dataset.year || '';
            const itemType = item.dataset.type || '';

            // Check search term
            const matchesSearch = !searchTerm ||
                title.includes(searchTerm) ||
                authors.includes(searchTerm);

            // Check year filter
            const matchesYear = selectedYear === 'all' ||
                (selectedYear === 'older' && parseInt(itemYear) <= 2018) ||
                itemYear === selectedYear;

            // Check type filter
            const matchesType = selectedType === 'all' || itemType === selectedType;

            // Show/hide item
            if (matchesSearch && matchesYear && matchesType) {
                item.classList.remove('hidden');
                visibleCount++;
                yearVisibility[itemYear] = true;
            } else {
                item.classList.add('hidden');
            }
        });

        // Show/hide year sections based on visibility
        yearSections.forEach(section => {
            const year = section.dataset.year;
            if (yearVisibility[year]) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        // Show no results message
        showNoResultsMessage(visibleCount);
    }

    function showNoResultsMessage(count) {
        // Remove existing no results message
        const existingMessage = document.querySelector('.no-results');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Add no results message if needed
        if (count === 0) {
            const noResultsHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No publications found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            publicationsContainer.insertAdjacentHTML('beforeend', noResultsHTML);
        }
    }

    // Debounce function to limit search frequency
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // BibTeX copy functionality
    function copyBibTeX(pubTitle) {
        // This would generate and copy BibTeX
        // For now, just show a message
        const bibtex = `@article{zou2024${pubTitle.substring(0, 20).toLowerCase().replace(/\s+/g, '')},
    title={${pubTitle}},
    author={Zou, Difan and others},
    journal={Conference},
    year={2024}
}`;

        navigator.clipboard.writeText(bibtex).then(() => {
            alert('BibTeX copied to clipboard!');
        });
    }

    // Export search results (future feature)
    function exportResults() {
        const visiblePubs = document.querySelectorAll('.pub-item:not(.hidden)');
        const results = [];

        visiblePubs.forEach(pub => {
            const title = pub.querySelector('h3')?.textContent;
            const authors = pub.querySelector('.authors')?.textContent;
            results.push({ title, authors });
        });

        console.log('Export results:', results);
        alert(`Found ${results.length} publications. Export functionality would save these to a file.`);
    }

    // Make functions available globally if needed
    window.copyBibTeX = copyBibTeX;
    window.exportResults = exportResults;

    // Add export button to page header (optional)
    const pubControls = document.querySelector('.pub-controls');
    if (pubControls && pubItems.length > 0) {
        // You can add an export button here if desired
        // const exportBtn = document.createElement('button');
        // exportBtn.className = 'btn btn-small btn-outline';
        // exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Results';
        // exportBtn.onclick = exportResults;
        // pubControls.appendChild(exportBtn);
    }

    // Highlight search terms
    function highlightSearchTerms(text, term) {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Add smooth scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'scale(1)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'scale(0.8)';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
