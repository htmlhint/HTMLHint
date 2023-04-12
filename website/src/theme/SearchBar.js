import React from 'react';
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

export default function SearchBarWrapper(props) {
  return (
    <EnhancedSearch
      config={{
        enhancedSearch: {
          projectId: '<replace_with_project_id>',
          accessToken: '<replace_with_access_token>'
        }
      }}
      theme={{
        primaryColor: "#ee503e"
      }}
      {...props}
    />
  );
};
