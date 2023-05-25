import create from 'zustand';

enum EnumType {
    public= 'PUBLIC',
    private='PRIVATE'
}

type UserStore = {
  name: string;
  type: EnumType;
  members: string
  setName: (name: string) => void;
  setType: (type: EnumType) => void;
  setMembers: (members: string) => void;
};

const useUserStoreChannel = create<UserStore>((set) => ({
  name: '',
  type: EnumType.public,
  members: '',
  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  setMembers: (members) => set({ members }),
}));

export default useUserStoreChannel;
