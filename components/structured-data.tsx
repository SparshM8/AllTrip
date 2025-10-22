import React from 'react';

interface StructuredDataProps {
  data: any;
}

// Renders a JSON-LD script tag. Wraps JSON.stringify with no indentation for minimal bytes.
// Usage: <StructuredData data={generateDestinationStructuredData(...)} />
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default StructuredData;