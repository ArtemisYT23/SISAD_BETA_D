import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import SesionReducer from "./states/LoginUser";
import GroupReducer from "./states/Group";
import CabinetReducer from "./states/Cabinet";
import NameReducer from "./states/Name";
import UserSecurityReducer from "./states/UserSesion";
import ViewReducer from "./states/View";
import ActionReducer from "./states/ActionCore";
import FileTypeReducer from "./states/FileType";
import FolderReducer from "./states/Folder";
import HistoryReducer from "./states/History";
import DocumentaryReducer from "./states/Document";
import ModalDocumentaryReducer from "./states/ActionDocumentary";
import FilesCoreReducer from "./states/Files";
import ModalConfigReducer from "./states/ActionConfig";
import IndexReducer from "./states/Indexes";
import ListReducer from "./states/List";
import TypeDataReducer from "./states/DataType";
import MetadataReducer from "./states/Metadata";
import MenuOptionsReducer from "./states/OptionsMenu";
import UserCoreReducer from "./states/UserCore";
import ModalSecurityReducer from "./states/ActionSecurity";
import ProfileReducer from "./states/Profile";
import PermisionReducer from "./states/Permision";
import OptionResourceReducer from "./states/OptionResource";
import ResourceCoreData from "./states/ResourceCore";


//formData
import GroupDataReducer from "../redux/formData/GroupData";
import CabinetDataReducer from "../redux/formData/CabinetData";
import FolderDataReducer from "../redux/formData/FolderData";
import IndexDataReducer from "./formData/IndexData";
import ListDataReducer from "../redux/formData/ListData";
import ElementDataReducer from "../redux/formData/ElementData";
import FileTypeDataReducer from "./formData/FileTypeData";
import DataTypeDataReducer from "./formData/DataTypeData";
import FileUploaderReducer from "./formData/FileData";
import FileDataReducer from "./formData/FilesData";
import UserDataReducer from "./formData/UserData";
import ProfileDataReducer from "./formData/Profile";
import ResourceDataReducer from "./formData/ResourceData";
import FilterReducer from "./formData/FilterData";

const rootReducer = combineReducers({
    sesion: SesionReducer,
    groupCore: GroupReducer,
    cabinetCore: CabinetReducer,
    nameCore: NameReducer,
    userSesion: UserSecurityReducer,
    viewCore: ViewReducer,
    modalCore: ActionReducer,
    groupData: GroupDataReducer,
    cabinetData: CabinetDataReducer,
    typeFileCore: FileTypeReducer,
    folderCore: FolderReducer,
    historyCore: HistoryReducer,
    folderData: FolderDataReducer,
    documentary: DocumentaryReducer,
    modalDocumentary: ModalDocumentaryReducer,
    filesCore: FilesCoreReducer,
    modalConfig: ModalConfigReducer,
    indexCore: IndexReducer,
    indexData: IndexDataReducer,
    listCore: ListReducer,
    typeDataCore: TypeDataReducer,
    metaCore: MetadataReducer,
    menuOptions: MenuOptionsReducer,
    listDataNew: ListDataReducer,
    elementDataNew: ElementDataReducer,
    FileTypeData: FileTypeDataReducer,
    DataTypeData: DataTypeDataReducer,
    uploader: FileUploaderReducer,
    filesData: FileDataReducer,
    userCore: UserCoreReducer,
    modalSecurity: ModalSecurityReducer,
    changeUser: UserDataReducer,
    profileCore: ProfileReducer,
    permisionCore: PermisionReducer,
    profileData: ProfileDataReducer,
    optionCore: OptionResourceReducer,
    dataResult: ResourceDataReducer,
    resourceCore: ResourceCoreData,
    filterData: FilterReducer,
});

export default function generateStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    return store;
}