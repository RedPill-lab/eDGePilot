// Update the handleEditFollower function in the Copytrading component
const [editingFollower, setEditingFollower] = useState<FollowerAccount | null>(null);

const handleEditFollower = (follower: FollowerAccount) => {
  setEditingFollower(follower);
};

const handleSaveFollowerSettings = (updatedFollower: FollowerAccount) => {
  setFollowers(followers.map(f => 
    f.id === updatedFollower.id ? updatedFollower : f
  ));
  setEditingFollower(null);
};

// Add this near the end of the JSX, before the closing tag
{editingFollower && (
  <FollowerSettingsModal
    follower={editingFollower}
    onClose={() => setEditingFollower(null)}
    onSave={handleSaveFollowerSettings}
  />
)}