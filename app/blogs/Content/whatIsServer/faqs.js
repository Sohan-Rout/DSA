// Shared by content.jsx (rendered FAQ) and page.jsx (FAQPage JSON-LD).
// Keep this the single source of truth so the two never drift.
export const faqs = [
  {
    q: "Is a server a special kind of computer?",
    a: "No. A server is still a computer, with a CPU, memory, storage and a network connection. What makes it a server is the job it does and the software it runs: it waits for requests from other computers and responds to them.",
  },
  {
    q: "Where are servers actually located?",
    a: "Servers are physical machines, usually housed in data centers that can hold thousands of them. Even when something is described as being stored in the cloud, it is running on real hardware in a building somewhere.",
  },
  {
    q: "Can my laptop be a server?",
    a: "Yes. If you start a server application on your laptop and let another computer connect to it, your laptop is acting as a server. Dedicated servers are simply built to do that job reliably, all day, for many users at once.",
  },
  {
    q: "What is the client-server model?",
    a: "It is the arrangement behind most of the internet. A client, such as your browser, asks for something. A server receives that request, does whatever work is needed, and sends a response back.",
  },
];
