import db from "../datbase.js"



 export const getTodos =async (req, res) => {
    const userid = req.userId;

    try{
        const result = await db.query("SELECT * FROM list WHERE user_id = $1" , [userid]);
        return res.status(200).json(result.rows);
    } catch (err){
        console.error("Error fetching todo list:", err);
        return res.status(500).json({ message: "Server error" });
    }
}



export const createTodos= async(req ,res)=>{
    const {item } =req.body;
    const userId = req.userId;
  
    try{
        const result = await db.query("INSERT INTO list (item , user_id) vALUES ($1 ,$2) RETURNING *",[item, userId]);
return res.status(200).json(result.rows[0]);
    } catch(err){
        console.error("Error creating todo item:", err);
        return res.status(500).json({ message: "Server error" });
     }
}; 



export const deleteTodos = async (req, res)=>{
   const {id } = req.params;
   try{
    const result = await db.query("DELETE FROM list WHERE id=$1", [id]);
    return res.status(200).json({ message: "Todo item deleted successfully" });     
   } catch(err){
    console.error("Error deleting todo item:", err);
    return res.status(500).json({ message: "Server error" });
}
}

