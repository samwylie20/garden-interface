import { useState, useEffect } from "react";
import Modal from "./addPlantModal.component";
// import EditSVG from "./SVG-components/editSVG.component";
// import DeleteSVG from "./SVG-components/deleteSVG.component";
import "./plantLibrary.component.scss";
import Swal from "sweetalert2";
import Timeline from "react-calendar-timeline"; // Timeline
// import "react-calendar-timeline/lib/Timeline.css"; // Timeline CSS
import moment from "moment";

const PlantLibraryDaisy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [plants, setPlants] = useState([]);
// Timeline
  // https://github.com/namespace-ee/react-calendar-timeline
  const groups = plants.map((plant, index) => {
    return {
      title: plant.plant_name,
      id: index + 1,
    };
  });

  const items = plants.map((plant, index) => {
    return {
      group: index + 1,
      title: plant.plant_name,
      id: index + 1,
      start_time: moment.unix(plant.start_time),
      end_time: moment.unix(plant.end_time),
    };
  });

  // Get all plants data
  const getPlants = async () => {
    try {
      const response = await fetch("http://localhost:5000/plants");
      const jsonData = await response.json();
      setPlants(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete a plant
  const deletePlant = async (id) => {
    const swalDelete = await Swal.fire({
      icon: "question",
      title: "Are you sure you want to delete this plant?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (swalDelete.isConfirmed)
      try {
        const deletePlant = await fetch(`http://localhost:5000/plants/${id}`, {
          method: "DELETE",
        });
        setPlants(plants.filter((plant) => plant.id !== id));
        Swal.fire("Deleted!", "", "success");
      } catch (error) {
        console.error(error.message);
      }
  };
  useEffect(() => {
    getPlants();
  }, []);


  return (
    <div className="overflow-x-auto w-full">
      <h2 className="t-3 text-3xl font-extrabold tracking-tight text-green-400 text-center">
        Welcome to your Plant Library
      </h2>
      <div stlye={BUTTON_WRAPPER_STYLE} className="container">
        <div className="addPlantButton">
          <button
            className="p-2 rounded-lg uppercase font-semibold text-right text-slate-800 bg-green-400 hover:bg-green-300"
            onClick={() => setIsOpen(true)}
          >
            Add New Plant
          </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
        </div>
      </div>

      <table className="table w-full">
        <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Type</th>
          <th>Growth Time (weeks)</th>
          <th>Season</th>
          <th>Ideal Planting</th>
          <th>Climate</th>
          <th>Need Cover</th>
          <th>Edit/ Remove</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <span className="text-3xl mb-3">🌵</span>
              </div>
              <div>
                <div className="font-bold">Cactus</div>
                <div className="text-sm opacity-50">Cactaceae</div>
              </div>
            </div>
          </td>
          <td>
            Pot Plant
            <br />
            <span className="badge badge-ghost badge-sm">Visual</span>
          </td>
          <td>20</td>
          <th>
            <button className="btn btn-ghost btn-xs">Spring/ Summer</button>
          </th>
          <td>Spring</td>
          <td>Dry</td>
          <td>Yes</td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <span className="text-3xl mb-3">🏵️</span>
              </div>
              <div>
                <div className="font-bold">Marigold</div>
                <div className="text-sm opacity-50">Tagetes</div>
              </div>
            </div>
          </td>
          <td>
            Garden/ Pot Plant
            <br />
            <span className="badge badge-ghost badge-sm">
            Flowering/ Edible
            </span>
          </td>
          <td>10</td>
          <th>
            <button className="btn btn-ghost btn-xs">Spring/ Summer</button>
          </th>
          <td>Spring</td>
          <td>Dry/ Any</td>
          <td>No</td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <span className="text-3xl mb-3">🌴</span>
              </div>
              <div>
                <div className="font-bold">Coconut</div>
                <div className="text-sm opacity-50">Cocos nucifera</div>
              </div>
            </div>
          </td>
          <td>
            Tree  
            <br />
            <span className="badge badge-ghost badge-sm">
              Edible
            </span>
          </td>
          <td>540</td>
          <th>
            <button className="btn btn-ghost btn-xs">Spring/ Summer</button>
          </th>
          <td>Tropical</td>
          <td>Dry</td>
          <td>No</td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <span className="text-3xl mb-3">🍀</span>
              </div>
              <div>
                <div className="font-bold">Clover</div>
                <div className="text-sm opacity-50">Trifolium</div>
              </div>
            </div>
          </td>
          <td>
            Ground Cover
            <br />
            <span className="badge badge-ghost badge-sm">
              Ornamental
            </span>
          </td>
          <td>3</td>
          <th>
            <button className="btn btn-ghost btn-xs">Any</button>
          </th>
          <td>Spring</td>
          <td>Any</td>
          <td>No</td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <span className="text-3xl mb-3">🌿</span>
              </div>
              <div>
                <div className="font-bold">Thyme</div>
                <div className="text-sm opacity-50">Thymus</div>
              </div>
            </div>
          </td>
          <td>
            Bush
            <br />
            <span className="badge badge-ghost badge-sm">
              Edible
            </span>
          </td>
          <td>3</td>
          <th>
            <button className="btn btn-ghost btn-xs">Spring/Summer</button>
          </th>
          <td>Spring</td>
          <td>Any</td>
          <td>Some</td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <span className="text-3xl mb-3">🌹</span>
              </div>
              <div>
                <div className="font-bold">Rose</div>
                <div className="text-sm opacity-50">Rosa</div>
              </div>
            </div>
          </td>
          <td>
            Flower
            <br />
            <span className="badge badge-ghost badge-sm">
              Ornamental
            </span>
          </td>
          <td>3</td>
          <th>
            <button className="btn btn-ghost btn-xs">Any</button>
          </th>
          <td>Spring</td>
          <td>Any</td>
          <td>No</td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <span className="text-3xl mb-3">🌻</span>
              </div>
              <div>
                <div className="font-bold">Sunflower</div>
                <div className="text-sm opacity-50">Helianthus annuus</div>
              </div>
            </div>
          </td>
          <td>
            Flower
            <br />
            <span className="badge badge-ghost badge-sm">
              Ornamental/ Edible
            </span>
          </td>
          <td>3</td>
          <th>
            <button className="btn btn-ghost btn-xs">Any</button>
          </th>
          <td>Spring</td>
          <td>Any</td>
          <td>No</td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <span className="text-3xl mb-3">🌺</span>
              </div>
              <div>
                <div className="font-bold">Hibiscus</div>
                <div className="text-sm opacity-50">Malvaceae</div>
              </div>
            </div>
          </td>
          <td>
            Flower
            <br />
            <span className="badge badge-ghost badge-sm">
              Ornamental
            </span>
          </td>
          <td>3</td>
          <th>
            <button className="btn btn-ghost btn-xs">Any</button>
          </th>
          <td>Spring</td>
          <td>Any</td>
          <td>No</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Type</th>
          <th>Growth Time (weeks)</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
  )
}

const BUTTON_WRAPPER_STYLE = {
  position: "relative",
  zIndex: 1,
};

export default PlantLibraryDaisy;
