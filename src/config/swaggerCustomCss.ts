export const customCss = `
@media (prefers-color-scheme: dark) {
    /* Overall background and text color */
    body, .swagger-ui {
        background: #121212; /* Slightly lighter dark background for better contrast */
        color: #ffffff; /* Light grey text for readability */
    }

    /* Container and panels background */
    .swagger-container, .scheme-container, .topbar {
        background: #1e1e1e; /* Darker shade for depth */
        color: #ffffff; /* Brighter text for contrast */
    }

    /* Titles and Headings */
    .swagger-ui .info .title, .swagger-ui .info .description {
        color: #ffffff; /* Ensuring titles are bright and stand out */
    }

    /* Links and buttons */
    a, .btn {
        color: #bb86fc; /* Purple accent for links and buttons for a pop of color */
    }
    a:hover, .btn:hover {
        color: #3700B3; /* Darker purple on hover for interaction feedback */
    }

    /* Overriding table stripes for contrast */
    .swagger-ui table.model tr:nth-of-type(odd) {
        background-color: #333333;
    }
    /* Scheme container specific styling */
    .swagger-ui .scheme-container {
        background: #1e1e1e; /* Dark background for scheme container */
        color: #ddd; /* Light text color for readability */
        border: 1px solid #333; /* Subtle border to define edges */
    }

    /* Enhancing text and links within the scheme container */
    .scheme-container h1, .scheme-container h2, .scheme-container h3, .scheme-container a {
        color: #bb86fc; /* Light purple for headings and links for consistency and elegance */
    }

    /* Styling for input fields, select elements, and textareas */
    .swagger-ui .parameters input[type="text"],
    .swagger-ui .parameters input[type="number"],
    .swagger-ui select,
    .swagger-ui textarea {
        background-color: #333; /* Darker background for input fields */
        border: 1px solid #555; /* Slightly lighter border for visibility */
        color: #ddd; /* Light color for the text */
        padding: 5px; /* Padding for better text alignment */
    }

    /* Hover and focus effects for inputs to improve user experience */
    .swagger-ui .parameters input[type="text"]:hover,
    .swagger-ui .parameters input[type="text"]:focus,
    .swagger-ui select:hover,
    .swagger-ui select:focus,
    .swagger-ui textarea:hover,
    .swagger-ui textarea:focus {
        border: 1px solid #bbb; /* Lighter border on hover/focus for visibility */
        background-color: #424242; /* Slightly lighter background for emphasis */
    }

    /* Links and buttons styling with a purple accent for a cohesive look */
    a, .btn {
        color: #bb86fc; /* Purple accent for links and buttons for a pop of color */
    }
    a:hover, .btn:hover {
        color: #3700B3; /* Darker purple on hover for interaction feedback */
    }

    /* Customizing the appearance of operation buttons for better visibility */
    .swagger-ui .opblock-summary-control,
    .swagger-ui .opblock-summary {
        background-color: #333; /* Dark background for operations */
        color: #fff; /* White text for better readability */
    }

    .scheme-container a:hover {
        color: #3700B3; /* Darker purple on hover for a nice interactive effect */
    }

    /* Adjusting padding and margins for better spacing and readability */
    .scheme-container p, .scheme-container li {
        color: #e0e0e0; /* Ensuring text is easily readable */
        margin-bottom: 8px; /* Adding some space below paragraphs and list items */
    }

    /* Customizing lists within the scheme-container for clarity */
    .scheme-container ul, .scheme-container ol {
        padding-left: 20px; /* Ensuring lists are indented for clarity */
        color: #e0e0e0; /* Light grey text color for list items */
    }


    /* Customizing parameter and response sections for better differentiation */
    .swagger-ui .opblock .opblock-section-header, .swagger-ui .response .response-col_status, .swagger-ui .response .response-col_description {
        background-color: #2A2A2A; /* Slightly lighter for separation */
        color: #ffffff;
    }

    /* Adjusting filter to none for all elements to maintain color integrity */
    .swagger-ui, .swagger-ui .microlight {
        filter: none;
    }
    .swagger-ui a.nostyle, .swagger-ui a.nostyle:visited {
        color: #bb86fc; /* Purple accent for links */
        filter: none;
    }
    .swagger-ui .opblock .opblock-summary-operation-id, .swagger-ui .opblock .opblock-summary-path, .swagger-ui .opblock .opblock-summary-path__deprecated {
        color: #ffffff; /* Bright text for better readability */
    }
    .swagger-ui .opblock .opblock-section-header h4 {
        color: #ffffff; /* Bright text for better readability */
    }
    .swagger-ui .opblock-description-wrapper p, .swagger-ui .opblock-external-docs-wrapper p, .swagger-ui .opblock-title_normal p {
        color: #ffffff; /* Bright text for better readability */
    }
}`
