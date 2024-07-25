import UserInfo from "../components/UserInfo";
import useUserInfoFields from "../hooks/UserInfoFields";

const Profile = () => {
  const userInfoFields = useUserInfoFields();

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-8">Profile</h1>
      <div className="flex flex-col gap-4">
        {userInfoFields.map((field, index) => (
          <UserInfo
            key={index}
            label={field.label}
            value={field.value}
            onSave={field.onSave}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
