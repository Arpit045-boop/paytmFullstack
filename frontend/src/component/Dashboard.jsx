import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { UserComp } from "./UserComp";

export function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={"10,000"} />
        <UserComp />
      </div>
    </div>
  );
}
