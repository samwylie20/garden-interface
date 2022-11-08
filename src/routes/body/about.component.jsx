const About = () => {
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 place-content-center">
        <h2 className="text-xl font-bold tracking-tight text-center hover:text-primary md:text-2xl md:pt-4 ">
          About...
        </h2>
      </div>

      <div className="text-center text-md tracking-tight ml-8 mr-8 md:ml-64 md:mr-64 md:p-4">
        <p>
          The Visual Garden DB is a Fullstack PERN (Postgres, Express, React,
          Node) application that aims to create a visual database for recording
          information about a users horticultural operations, whether that be a
          backyard veggie patch or a commercial nursery.
        </p>
        <br />
        <p>
          With Visual Garden DB, users can create multiple sections of multiple
          plots wheres they can store useful information about what they have
          planted. Users also have access to the plant library. The library
          connect to the REST API GrowStuff, which populates our database with a
          plethora of different plant species. If the user cannot find a desired
          plant, they can simply add a plant to the library themselves,
          supplying all the information they deem relevant.
        </p>
      </div>
    </div>
  );
};
export default About;
