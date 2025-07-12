import { Camera, User, LoaderCircle } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore.js"
import { useScoreStore } from "../store/useScoreStore"
import { useEffect, useState } from "react"

const ProfileView = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const { getBestScore, bestScore } = useScoreStore()
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({ picture: base64Image })
    }
  }

  useEffect(() => {
    getBestScore()
  }, [getBestScore])

  return (
    <section className="h-screen pt-20 bg-base-300">
    <div className="mt-6 mx-6">
      <div className="max-w-md mx-auto p-4 bg-base-200 rounded-2xl shadow-lg">

        <h1 className="text-2xl text-center mb-4 p-3 font-semibold">Card Profile</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative mx-auto">
            <img src={selectedImage || authUser.picture || `https://ui-avatars.com/api/?name=${authUser.username}&background=random`} alt="profile image" className="size-32 rounded-full object-cover border-4 border-primary/10" />
            <label htmlFor="picture"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
            >
              {isUpdatingProfile ? <LoaderCircle className="h-5 w-5 animate-spin text-base-200" /> : <Camera className="w-5 h-5 text-base-200" />}

              <input type="file" id="picture" name="picture" className="hidden" accept="image/*" onChange={handleImageUpdate} disabled={isUpdatingProfile} />
            </label>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-lg bg-base-content text-base-300 p-2 px-3">
              <h1 className="font-semibold text-base sm:text-sm text-center">Snake Players</h1>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-accent z-10" />
              </div>
              <p className="p-2 pl-10 rounded-lg bg-primary/10 border-2 border-accent">{authUser.username}</p>
            </div>

            <span className="mx-auto sm:mx-0 text-sm bg-base-content/10 py-1 px-3 rounded-2xl w-max">Best Score: {bestScore} Point </span>
          </div>

        </div>

      </div>

      </div>
    </section>
  )
}

export default ProfileView