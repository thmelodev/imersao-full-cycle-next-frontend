import { RouteModel } from "../../utils/models";
import { MapDriver } from "./MapDriver";

export async function DriverPage() {

    async function getRoutes(){
        const response = await fetch('http://localhost:3000/routes', {
          cache: 'force-cache',
          next: {
            tags: ['routes'],
          }
        });
        return await response.json();
    }

    const routes = await getRoutes();

  return (
    <div className="flex flex-1 w-full h-full">
      <div className="w-1/3 p-2 h-full">
        <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>
        <div className="flex flex-col">
          <form>
          <select
              id="route_id"
              name="route_id"
              className="mb-3 p-2 border rounded bg-default text-contrast w-full"
            >
              <option key="0" value="">
                Selecione uma rota
              </option>
              {routes.map((route: RouteModel) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
            <button
              className="bg-main text-primary p-2 rounded text-xl font-bold"
              style={{ width: "100%" }}
            >
              Iniciar a viagem
            </button>
          </form>
        </div>
      </div>
      <MapDriver />
    </div>
  );
}

export default DriverPage;
