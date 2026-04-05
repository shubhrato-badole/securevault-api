import db from "../datbase.js"




export const createNotes = async (req ,res) => {
const {title, content } =req.body;
 const userId = req.userId;

console.log(userId)

    try{
        const result = await db.query("INSERT INTO notes (title, content , user_id) VALUES ($1 , $2 ,$3) RETURNING *" ,[title , content , userId]);
        return res.status(200).json(result.rows[0]);

    } catch(err){
        console.error("Error creating note:", err);
        return res.status(500).json({ message: "Server error" });
    }
}



 export const getNotes = async (req, res) => {
   const userid = req.userId;
    try{
        const result = await db.query("SELECT * FROM notes where  user_id = $1 ", [userid]);
        return res.status(200).json(result.rows);
    }catch(err){
        console.error("Error fetching notes:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


export const deleteNotes = async (req, res) => {
    const {id}= req.params;

    try{
        const result = await db.query("DELETE FROM notes WHERE id =$1", [id]);
        return res.status(200).json({ message: "Note deleted successfully" });

    }catch(err){
        console.error("Error deleting note:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

