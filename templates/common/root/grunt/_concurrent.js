// Run some tasks in parallel to speed up the build process
module.exports = {
  server: [<% if (coffee) { %>
    'coffee:dist',<% } %><% if (compass) { %>
    'compass:server'<% } else { %>
    'copy:styles'<% } %>
  ],
  test: [<% if (coffee) { %>
    'coffee',<% } %><% if (compass) { %>
    'compass'<% } else { %>
    'copy:styles'<% } %>
  ],
  dist: [<% if (coffee) { %>
    'coffee',<% } %><% if (compass) { %>
    'compass:dist',<% } else { %>
    'copy:styles',<% } %>
    'imagemin',
    'svgmin'
  ]
};
