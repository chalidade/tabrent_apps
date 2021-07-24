export async function fetch_data(url = '', data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: JSON.stringify(data)
  });
  const respJson = await response.json();
  return respJson; // parses JSON response into native JavaScript objects
}

/* How to Use
import { fetch_data } from "../components/variables/api";
useEffect(() => {
  let list = {
    action: "list",
    table: "tx_product",
    where: "",
    first: "false",
    join: "",
  };
  fetch_data("POST", "http://localhost/Judgment/Warda/BE/list", list).then(
    function (result) {
      setdata(result.data);
    }
  );
}, []);
*/
