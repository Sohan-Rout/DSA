// Emits one or more schema.org graphs as JSON-LD.
// Server component, so the script lands in the initial HTML where crawlers
// see it without executing JavaScript.
const JsonLd = ({ schemas }) => (
  <>
    {schemas.map((schema, i) => (
      <script
        key={i}
        type="application/ld+json"
        // JSON.stringify output is escaped below so a stray "</script>" in
        // any content string cannot break out of the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    ))}
  </>
);

export default JsonLd;
